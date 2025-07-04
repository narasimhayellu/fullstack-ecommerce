import React, { useState, useEffect } from 'react';
import CartDetails from '../cart_details/cart_details';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./cart.css"
import { Button } from '@mui/material';
import axios from "axios";

const Cart = () => {
    const [cartItem, setCartItem] = useState([]);
    const [loading, setLoading] = useState(true);
    
    console.log(cartItem, "cart items");

    const totalQuantity = cartItem.reduce((acc, item) => acc + (item.qty || 0), 0);

    const saveCartToDB = async (updatedCart) => {
        const userId = localStorage.getItem("userId"); // Remove JSON.parse for string
        if (!userId) {
            console.log("No userId found");
            return;
        }      
    
        try {
            await axios.post("http://localhost:3000/cart/save", {
                userId,
                items: updatedCart,
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log("Cart synced with DB");
        } catch (err) {
            console.error("Error syncing cart:", err);
        }
    };

    const addQty = (id) => {
        const sortedCart = cartItem.map((each) => {
            return each.id !== id ? each : { ...each, qty: each.qty + 1 };
        });
    
        localStorage.setItem("cart", JSON.stringify(sortedCart));
        setCartItem(sortedCart);
        saveCartToDB(sortedCart);
    };

    const removeQty = (id, qty) => {
        let updatedCart;
    
        if (qty === 1) {
            updatedCart = cartItem.filter((each) => each.id !== id);
        } else {
            updatedCart = cartItem.map((each) =>
                each.id !== id ? each : { ...each, qty: each.qty - 1 }
            );
        }
    
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCartItem(updatedCart);
        saveCartToDB(updatedCart);
    };
    
    const removeItem = (id) => {
        const updatedCart = cartItem.filter((each) => each.id !== id);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCartItem(updatedCart);
        saveCartToDB(updatedCart);
    };

    useEffect(() => {
        const userId = localStorage.getItem("userId"); // Remove JSON.parse for string
        
        const fetchCart = async () => {
            try {
                if (userId) {
                    console.log("Fetching cart for userId:", userId);
                    const response = await axios.get(`http://localhost:3000/cart/${userId}`);
                    console.log("Cart response:", response.data);
                    
                    if (response.data && response.data.items) {
                        setCartItem(response.data.items);
                        localStorage.setItem("cart", JSON.stringify(response.data.items));
                    } else {
                        // If no cart found in DB, check localStorage
                        const localCart = JSON.parse(localStorage.getItem("cart")) || [];
                        setCartItem(localCart);
                    }
                } else {
                    // If no userId, just use localStorage
                    const localCart = JSON.parse(localStorage.getItem("cart")) || [];
                    setCartItem(localCart);
                }
            } catch (error) {
                console.error("Failed to fetch cart:", error);
                // Fallback to localStorage if API fails
                const localCart = JSON.parse(localStorage.getItem("cart")) || [];
                setCartItem(localCart);
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, []);
    
    if (loading) {
        return <div>Loading cart...</div>;
    }
    
    if (!Array.isArray(cartItem)) {
        console.error("Cart data is not an array:", cartItem);
        return <p>Error loading cart data</p>;
    }
    
    return(
        <div>
            <div>
                {cartItem.length > 0 ? (
                    cartItem.map((each) => (
                        <CartDetails 
                            cartItem={each} 
                            key={each.id} 
                            addQty={addQty}
                            removeQty={removeQty}
                            removeItem={removeItem}
                        />
                    ))
                ) : (
                    <div className="empty">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGh4_lufGYCTbAKTVAZ3YxtWIV06iQVPQQIg&s" alt="Empty cart" />
                        <h3>Add Items to Cart</h3>
                    </div>
                )}
            </div>
            <div className="totalcart d-flex justify-content-between">
                <div className='m-4'>
                    <h4>Cart Summary:</h4>
                    {cartItem.length > 0 ? (
                        <>
                            <h6>
                                <b>Sub Total: {totalQuantity} items</b>                
                            </h6>
                            <Button variant='contained' color='primary' type='submit'>
                                Proceed to Buy
                            </Button>
                        </>
                    ) : (
                        <h6>Your cart is Empty</h6>
                    )}
                </div>
                <ShoppingCartIcon className='me-3 mt-4' style={{ height: 80, width: 80 }} />
            </div>
        </div>
    );
};

export default Cart;