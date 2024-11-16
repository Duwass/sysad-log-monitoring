'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import logger from "../logger";
import Image from "next/image";
import cartLogo from '../../public/cart.png';

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
    'Accessories',
    'Audio',
    'Computers',
    'Drones',
    'Electronics',
    'Gaming',
    'Tablets',
    'Wearables'
]; // Example categories, adjust as needed

const Shop = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const router = useRouter();
    
    useEffect(() => {
        const userID = localStorage.getItem('userID');
        if (userID == null) {
            router.push('/login');
            return;
        }

        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/product/list');
                const data = await response.json();

                if (response.ok) {
                    setProducts(data);
                    logger.info('Products fetched successfully');
                } else {
                    setError('Failed to load products');
                    logger.error('Failed to load products');
                }
            } catch (err) {
                setError('Error fetching products');
                logger.error('Error fetching products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [router]);


    const filteredProducts = selectedCategory === 'All'
        ? products
        : products.filter(product => product.category === selectedCategory);

    const addToCart = async (product: Product) => {
        const customerId = localStorage.getItem('userID');
        const productCode = product.productCode;
        const quantity = 1;

        try {
            const response = await fetch('http://localhost:3001/api/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({ customerId, productCode, quantity }),
            });

            const data = await response.json();

            if (response.ok) {
                // Add cartID to storage
                localStorage.setItem('cartID', data._id)
            
                // now do something..
                alert(`${product.productName} has been added to your cart!`);
                logger.info(`${product.productName} added to cart`);
            }
        } catch (err) {
            logger.error('Error adding product to cart');
        }
    };

    return (
        <div style={{ padding: '2rem' }}> 
            <div className='header'>
                <a href='/dashboard' style={{fontSize:44, fontWeight:'bold'}}>SysAd Shop</a>
                <a href='/cart'> <Image src={cartLogo} alt='cart'></Image></a>
            </div>

            {loading ? (
                <div>
                    <div>Loading products...</div>
                </div>
                        
            ) : error ? (
                <div>
                    <div>{error}</div>
                </div>
            ) : (
                <div>
                    {/* Filter and Sort Section */}
                    <div>  
                        <label htmlFor="category">Filter by Category: </label>
                        <select
                            id="category"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            style={{borderRadius: '4px'}}
                        >
                            <option value="All">All</option>
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>

                    {/* Product List */}
                    <div className='product-listing'>
                        {filteredProducts.map(product => (
                            <div className='listing-cell' key={product._id} style={{ border: '2px solid #f5f5f5', padding: '1rem', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.2)'}}>
                                <h3>{product.productName}</h3>
                                <p><strong>Price:</strong> ${product.price}</p>
                                <p><strong>Category:</strong> {product.category}</p>
                                <p><strong>In stock:</strong> {product.stock}</p>
                                {product.description && <p>{product.description}</p>}
                                <button className='add-to-cart' onClick={() => addToCart(product)} style={{ padding: '0.5rem', marginTop: '1rem', border: '2px solid #f5f5f5', borderRadius: '8px'}}>
                                    Add to Cart
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Shop;
