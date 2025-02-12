import { Button, Rating, Typography } from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import './product_details.css'
import { enqueueSnackbar } from "notistack";

const ProductDetails = () => {

const {state} = useLocation();

const {id, image, name, ingredients, rating, cuisine,caloriesPerServing,instructions,reviewCount} = state || [];
const [cartItem, setCartItem] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
);
const selectedItem = cartItem.filter((each) => each.id === id);

const [qty,setQty] = useState(
    selectedItem[0] ? selectedItem[0].qty : 0
);
const addToCart = async () => {
    if (qty === 0) {
        const updatedCartItem = cartItem.filter(
          (each) => each.id !== __staticRouterHydrationDataid
        );
        localStorage.setItem("cart", JSON.stringify(updatedCartItem));
        enqueueSnackbar("Item removed from cart", { variant: "warning" });
        return;
      }
      if (selectedItem.length > 0) {
        const updatedCartItem = cartItem.filter((each) => each.id !== id);
        updatedCartItem.push({ qty, id, name, image });
        localStorage.setItem("cart", JSON.stringify(updatedCartItem));
        setCartItem(updatedCartItem);
        enqueueSnackbar("Item quantity updated", { variant: "success" });
      } else {
        cartItem.push({ qty, id, name, image });
        localStorage.setItem("cart", JSON.stringify(cartItem));
        setCartItem(cartItem);
        enqueueSnackbar("Item added to the cart", { variant: "success" });
      }
}

    return(
        <div className="wrapper" key={id}>
            <img className='productimage' src={image} alt="" />
            <div className="frame">
            <h1>{name}</h1>
            <h6>Ingredients: {ingredients}</h6>
            <h6>Instructions: {instructions}</h6>
            <h6>Cuisine: {cuisine}</h6>
            <h6>Calories: {caloriesPerServing}</h6>
            <div className="review">
            <Rating name="half-rating-read" value={rating} precision={0.5} readOnly/>
            <Typography>({reviewCount} Reviews)</Typography>
            </div>
            <div className="quantity">
            <Button variant="contained" color="error" onClick={()=>{if(qty > 0){{setQty(qty - 1)}}}}>-</Button>
            <Typography variant="h6" component="h1">&nbsp; Qty:{qty} &nbsp;</Typography>
            <Button variant="contained" color="success" onClick={()=>{setQty(qty + 1)}}>+</Button>
            </div>
            <div>           
                <Button variant="contained" color="primary" onClick={addToCart}>Add to Cart</Button>           
            </div>
            </div>
        </div>
    )
}

export default ProductDetails;