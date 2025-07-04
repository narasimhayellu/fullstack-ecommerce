import { Button, InputAdornment, Rating, TextField } from "@mui/material";
import "./products.css";
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import { WhatsappShareButton, FacebookShareButton, WhatsappIcon, FacebookIcon } from 'react-share';

const Products = (props) =>{
    const {products} = props;

    const [filteredProducts, setFilteredProducts] = useState(products);
    const [search, setSearch] = useState("");

    const handleChange = (e) => {
        setSearch(e.target.value);
        const filtered = products.filter((each) =>
            each.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredProducts(filtered);
    }

    const navigate = useNavigate(); 
    return (
        <div className="holder">
             <TextField className="search" label="Search" variant="outlined"  slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
        value={search}
        onChange={handleChange}
        />
             <div className='grid-container'>
         {filteredProducts.length > 0 && (filteredProducts.map((each) => {
            const {id, image, name, ingredients, rating, cuisine,caloriesPerServing,instructions,reviewCount} = each;
            return (
              <div className='item' key={id}>
                <img onClick={() => navigate(`/products/${id}`,
                {state:{id,image,name,ingredients,rating,cuisine,caloriesPerServing,instructions,reviewCount}}
              )} className='picture' src={image} alt="" />
                <h1 onClick={() => navigate(`/products/${id}`,
                {state:{id,image,name,ingredients,rating,cuisine,caloriesPerServing,instructions,reviewCount}}
              )}>{name}</h1>
                <h4>Cuisine: {cuisine}</h4>
                <Rating name="half-rating-read" value={rating} precision={0.5} readOnly /> <br />
                <Button onClick={() => navigate(`/products/${id}`,
                {state:{id,image,name,ingredients,rating,cuisine,caloriesPerServing,instructions,reviewCount}}
              )} className="pick" variant="contained" color="primary">See Details</Button> 
              <div className="share-buttons">
               <WhatsappShareButton url={window.location.origin + `/products`} title={`Check out this product: ${name}`}>
               <WhatsappIcon size={32} round />
               </WhatsappShareButton>
               <FacebookShareButton url={window.location.origin + `/products`} quote={`Check out this product: ${name}`}>
               <FacebookIcon size={32} round />
               </FacebookShareButton>
               </div>     
              </div>
            );
          }
         )) || <div className="mt-2">
            <p>No products found</p>
            <img src="https://img.freepik.com/free-vector/removing-goods-from-basket-refusing-purchase-changing-decision-item-deletion-emptying-trash-online-shopping-app-laptop-user-cartoon-character_335657-1172.jpg?ga=GA1.1.413569059.1731319642&semt=ais_hybrid" alt="" />
            </div> }
        </div>
        </div>
    )
}

export default Products;


















