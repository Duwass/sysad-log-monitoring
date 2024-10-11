'use client'
import { useEffect, useState } from 'react';

interface Product {
    _id: string;
    productName: string;
    productCode: string;
    category: string;
    price: number;
    stock: number;
    description?: string;
    manufacturer?: string;
}

const categories = [
    'Electronics',
    'Clothing',
    'Books',
    'Home Appliances',
    'Beauty',
    'Sports',
]; // Example categories, adjust as needed

const Shop = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [cart, setCart] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/product/list');
                const data = await response.json();
                if (response.ok) {
                    setProducts(data);
                } else {
                    setError('Failed to load products');
                }
            } catch (err) {
                setError('Error fetching products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = selectedCategory === 'All'
        ? products
        : products.filter(product => product.category === selectedCategory);

    const addToCart = (product: Product) => {
        setCart([...cart, product]);
        alert(`${product.productName} has been added to your cart!`);
    };

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Shop</h1>

            {/* Filter and Sort Section */}
            <div>
                <label htmlFor="category">Filter by Category: </label>
                <select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="All">All</option>
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>


            {/* Product List */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '1rem' }}>
                {filteredProducts.map(product => (
                    <div key={product._id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
                        <h3>{product.productName}</h3>
                        <p><strong>Price:</strong> ${product.price}</p>
                        <p><strong>Category:</strong> {product.category}</p>
                        <p><strong>Stock:</strong> {product.stock}</p>
                        {product.description && <p>{product.description}</p>}
                        <button onClick={() => addToCart(product)} style={{ padding: '0.5rem', marginTop: '1rem' }}>
                            Add to Cart
                        </button>

                    </div>
                ))}
            </div>

            {/* Cart Section */}
            <div style={{ marginTop: '2rem' }}>
                <h2>Shopping Cart</h2>
                <ul>
                    {cart.map(item => (
                        <li key={item._id}>{item.productName} - ${item.price}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Shop;
