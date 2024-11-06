'use client'
import { useEffect, useState } from 'react';
import logger from "../logger";

const Cart = () => {
    return (
        <div style={{ padding: '2rem' }}> 
            <div className='header'>
                <a href='/dashboard' style={{fontSize:44, fontWeight:'bold'}}>SysAd Shop</a>
            </div>
            <div>
                <div>
                    <h1>Hello hi welcome to the cart</h1>
                </div>

                <div>
                    This is where the item listing is.
                </div>
            </div>
        </div>
    );
};

export default Cart;