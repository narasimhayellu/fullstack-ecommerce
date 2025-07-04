import React, { useContext } from 'react';
import './Home.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AuthContext } from '../../auth/auth-context';
import Login from '../login/Login';
import Products from '../products/products';
import { enqueueSnackbar } from 'notistack';
import { RotatingLines } from 'react-loader-spinner';

const Home = () => {
        const [products, setProducts] = useState([]);

        const [loader, setLoader] = useState(true);
        
        const {isLogin} = useContext(AuthContext);

        useEffect(() => {
          document.title = "Food Crave";
          const fetchData = async () => {
            try {
              const resp = await axios.get(
                "https://dummyjson.com/recipes"
              );
              setProducts(resp.data.recipes);
            } catch (err) {
              enqueueSnackbar(`${err.message}`, {
                variant: "error",
              });
            } finally {
              setLoader(false);
            }
          };
      
          fetchData();
        }, []);
        
console.log(products);

    return (
      <div>
      {!isLogin ? (<Login />) :
        loader ? (  
        <div className='loader'>
          <RotatingLines
          visible={true}
          height="96"
          width="96"
          color="grey"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
          />
        </div> ) : (
        <div>
           <Products products = {products} />
        </div>
        )
      } 
      </div>
        )
}
export default Home;



