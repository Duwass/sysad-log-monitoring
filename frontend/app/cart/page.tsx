'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import logger from "../logger";

interface Product {
    productName: string;
    productCode: string;
    price: number;
    quantity: number;
}

const Cart = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    let totalPrice = 0;
    
    const fetchProductName = async (productCode: String) => {
        try {
            const product_res = await fetch(`http://localhost:3001/api/product/${productCode}`);
            const product_data = await product_res.json();
            
            if (product_res.ok) {
                // Get product name
                logger.info(`Fetched product name: ${product_data.productName}`)
                
                return product_data.productName;
            }
        } catch (err) {
            logger.info('Failed to fetch product name')
        }

        return null;
    }

    useEffect(() => {
        const userID = localStorage.getItem('userID');
        if (userID == null) {
            router.push('/login');
            return;
        }

        const fetchCart = async () => {
            const cartID = localStorage.getItem('cartID');
            try {
                const response = await fetch(`http://localhost:3001/api/cartbyid/${cartID}`);
                const data = await response.json();

                if (response.ok) {
                    data.items.forEach(item => {
                        fetchProductName(item.productCode).then(productName => {
                            item.productName = productName;      
                        })
                    })

                    setProducts(data.items);

                    // Add to log
                    logger.info('Cart fetched successfully');
                }
            } catch (err) {
                logger.error('Error fetching cart');
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, []);
    
    return (
        <div style={{ padding: '2rem' }}> 
            <div className='header'>
                <a href='/dashboard' style={{fontSize:44, fontWeight:'bold'}}>SysAd Shop</a>
            </div>

            {loading ? (
                <div>
                    <div>Loading...</div>
                </div>
                        
            ) : (
                <div>
                    <div>
                        <h1>Giỏ hàng của bạn: </h1>
                    </div>

            
                    <div className='product-listing'>
                        {products.map(product => (
                            <div className='listing-cell' style={{ height: '120px', border: '2px solid #f5f5f5', padding: '1rem', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.2)'}}>
                                <h3>{product.productName}</h3>
                                <p><strong>Giá mỗi mặt hàng:</strong> ${product.price}</p>
                                <p><strong>Số lượng:</strong> {product.quantity}</p>
                            </div>
                        ))}
                    </div>

                    <div>
                        <h1>Tổng tiền: ${totalPrice}</h1>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;