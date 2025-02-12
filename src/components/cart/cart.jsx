import React, { useState } from 'react';
import CartDetails from '../cart_details/cart_details';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./cart.css"
import { Button } from '@mui/material';


const Cart = () => {
    const [cartItem, setCartItem] = useState(
        JSON.parse(localStorage.getItem("cart")) || []
    );
    console.log(cartItem, "jhbjhb");

    const addQty = (id) => {
        const sortedCart = cartItem.map((each) => {
          if (each.id !== id) {
            return each;
          } else {
            return { ...each, qty: each.qty + 1 };
          }
        });
        localStorage.setItem("cart", JSON.stringify(sortedCart));
        setCartItem(sortedCart);
      };

    const removeQty = (id, qty) => {
        if (qty === 1) {
          const updatedCartItem = cartItem.filter((each) => each.id !== id);
          localStorage.setItem("cart", JSON.stringify(updatedCartItem));
          setCartItem(updatedCartItem);
          return;
        }
        const sortedCart = cartItem.map((each) => {
          if (each.id !== id) {
            return each;
          } else {
            return { ...each, qty: each.qty - 1 };
          }
        });
    
        localStorage.setItem("cart", JSON.stringify(sortedCart));
        setCartItem(sortedCart);
      };
    
    const removeItem = (id) => {
        const updatedCartItem = cartItem.filter((each) => each.id !== id);
        localStorage.setItem("cart", JSON.stringify(updatedCartItem));
        setCartItem(updatedCartItem);
      };  
    return(
        <div>
            <div>
            {cartItem.length > 0 ? (
                cartItem.map((each) =>(
                    <CartDetails 
                    cartItem = {each} 
                    key={each.id} 
                    addQty={addQty}
                    removeQty={removeQty}
                    removeItem={removeItem}/>
                ))
            ) : (
                <div className="empty">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGh4_lufGYCTbAKTVAZ3YxtWIV06iQVPQQIg&s" />
                  <h3> Add Items to Cart</h3>
                </div>
              )}
        </div>
        <div className="totalcart col-4 p-4 border border-secondary d-flex justify-content-between">
          <div>
            <h4> Cart Summary:</h4>
            {cartItem.length > 0 ? (
              <>
                <h6>
                  <b>Sub Total : {cartItem.length} items </b>
                 
                </h6>
                <p>Select Payment Method</p>
                <Button variant='contained' color='primary' type='submit'>Proceed to Buy</Button>
              </>
            ) : (
              <h6> Your cart is Empty</h6>
            )}
          </div>
          <ShoppingCartIcon style={{ height: 100, width: 100 }} />
        </div>
        </div>
    );
};

export default Cart;