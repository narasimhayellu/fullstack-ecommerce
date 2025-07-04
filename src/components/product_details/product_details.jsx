import { Button, Rating, Typography } from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './product_details.css'
import { enqueueSnackbar } from "notistack";
import { WhatsappShareButton, FacebookShareButton, WhatsappIcon, FacebookIcon } from 'react-share';
import axios from "axios";

const ProductDetails = () => {
    const { state } = useLocation();
    const location = useLocation();
    const navigate = useNavigate();
    const { id, image, name, ingredients, rating, cuisine, caloriesPerServing, instructions, reviewCount } = location.state || {};
    
    const [cartItem, setCartItem] = useState(
        JSON.parse(localStorage.getItem("cart")) || []
    );
    
    const selectedItem = cartItem.filter((each) => each.id === id);
    const [qty, setQty] = useState(
        selectedItem[1] ? selectedItem[1].qty : 1
    );
    
    const shareUrl = `${window.location.origin}/products/${id}`;

    const addToCart = async () => {
        const updatedCart = [...cartItem.filter(item => item.id !== id)];
        
        if (qty === 0) {
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            setCartItem(updatedCart);
            enqueueSnackbar("Item removed from cart", { variant: "warning" });
        } else {
            updatedCart.push({ qty, id, name, image });
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            setCartItem(updatedCart);
            enqueueSnackbar(selectedItem.length > 0 ? "Item quantity updated" : "Item added to cart", { variant: "success" });
        }

        // Save to MongoDB
        try {
            const userId = localStorage.getItem("userId"); // Remove JSON.parse for string
            if (!userId) {
                console.log("No userId found, skipping DB sync");
                return;
            }
            
            console.log("Saving cart to DB for userId:", userId);
            await axios.post("http://localhost:3000/cart/save", {
                userId,
                items: updatedCart,
            });
            console.log("Cart saved to DB");
        } catch (error) {
            console.error("Error saving cart:", error);
            enqueueSnackbar("Failed to sync cart with server", { variant: "error" });
        }
    };

    return (
        <div className="wrapper" key={id}>
            <img className='productimage' src={image} alt="" />
            <div className="frame">
                <h1 className="fs-1">{name}</h1>
                <h6>Ingredients: {ingredients}</h6>
                <h6>Instructions: {instructions}</h6>
                <h6>Cuisine: {cuisine}</h6>
                <h6>Calories: {caloriesPerServing}</h6>
                <div className="review">
                    <Rating name="half-rating-read" value={rating} precision={0.5} readOnly />
                    <Typography>({reviewCount} Reviews)</Typography>
                </div>
                <div className="review gap-2 mt-2">
                    <WhatsappShareButton url={shareUrl} title={`Check out this product: ${name}`}>
                        <WhatsappIcon size={32} round />
                    </WhatsappShareButton>
                    <FacebookShareButton url={shareUrl} quote={`Check out this product: ${name}`}>
                        <FacebookIcon size={32} round />
                    </FacebookShareButton>
                </div>
                <div className="quantity">
                    <Button variant="contained" color="error" onClick={() => qty > 0 && setQty(qty - 1)}>-</Button>
                    <Typography variant="h6" component="h1">&nbsp; Qty:{qty} &nbsp;</Typography>
                    <Button variant="contained" color="success" onClick={() => { setQty(qty + 1) }}>+</Button>
                </div>
                <div>
                    <Button variant="contained" color="primary" onClick={addToCart}>Add to Cart</Button>
                </div>
                <div className="mt-2">
                    <Button variant="contained" color="secondary" onClick={() => navigate("/cart")}>Go to Cart</Button>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails;