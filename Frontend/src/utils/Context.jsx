import axios from './axios';
import React, { createContext, useEffect, useState } from 'react'
// import Home from '../components/Home'

export const productContext = createContext();

function Context(props) {
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        try {
            const {data} = await axios("/products");
            setProducts(data);
        } catch (error) {
            console.log("error fetching products" ,  error);
        }
    }
 
     useEffect (() => {
        getProducts();
     }, [])

     useEffect(() => {
        if (products.length > 0) {
          console.log('Updated products:', products); // Log the updated products here.
        }
      }, [products]);

  return (
    <productContext.Provider value={[products, setProducts]}>
    {props.children}
    </productContext.Provider>
  )
}

export default Context