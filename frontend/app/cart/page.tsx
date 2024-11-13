'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logger from "../logger";
import delLogo from '../../public/delete.png';

interface Product {
    productName: string;
    productCode: string;
    price: number;
    quantity: number;
}

// Global variable
var totalPrice = 0;

function getTotalPrice(products : Product[]) {
    totalPrice = 0;
    products.forEach(product => {
        totalPrice += product.quantity * product.price;
    })

    return;
}

const deleteCart = async () => {
    var confirmation = confirm('Xóa giỏ hàng?');

    if (confirmation) {
        const cartID = localStorage.getItem('cartID');

        try {
            const response = await fetch(`http://localhost:3001/api/cart_delete/${cartID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                } 
            });

            if (response.ok) {
                logger.info(`Deleted cart with id: ${cartID} successfully`);

                alert('Giỏ hàng đã được xóa');
                window.location.reload();
            } else if (response.status == 404) {
                alert('Bạn không có giỏ hàng');
            } else {
                alert('Không xóa được giỏ hàng');
            }
        } catch (err) {
            logger.error('Error deleting cart');
        }
    }

    return;
}


const Cart = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    const [haveProducts, setHaveProd] = useState<boolean>(false);

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
                    // Set products
                    setProducts(data.items);

                    setHaveProd(true);

                    getTotalPrice(data.items);

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
    }, [router]);
    
    return (
        <div style={{ padding: '2rem' }}> 
            <div className='header'>
                <a href='/dashboard' style={{fontSize:44, fontWeight:'bold'}}>SysAd Shop</a>
                <a onClick={deleteCart}> <Image src={delLogo} alt='cart'></Image></a>
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

                    {haveProducts ? (
                        <div className='product-listing'>
                            {products.map(product => (
                                // eslint-disable-next-line react/jsx-key
                                <div className='listing-cell' style={{ height: '120px', border: '2px solid #f5f5f5', padding: '1rem', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.2)'}}>
                                    <h3>{product.productName}</h3>
                                    <p><strong>Giá mỗi mặt hàng:</strong> ${product.price}</p>
                                    <p><strong>Số lượng:</strong> {product.quantity}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div>
                            Bạn chưa thêm gì vào giỏ hàng!
                        </div>
                    )}

                    {haveProducts ? (
                        <div>
                            <h1>Tổng tiền: ${totalPrice}</h1>
                        </div>
                    ) : (
                        <div>
                        </div>
                    )}

                </div>
            )}
        </div>
    );
};

export default Cart;