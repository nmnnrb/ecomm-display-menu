import React, { useContext, useEffect, useState } from "react";
import { productContext } from "../utils/Context";
import { useParams } from "react-router-dom";
import axios from "../utils/axios";
import Nav from './Nav'

function Editt() {
  const [products, setProducts] = useContext(productContext);
  const { id } = useParams();
  const [allP, setAllP] = useState([]);

  useEffect(() => {
    const fetchproducts = async () => {
      try {
        const { data } = await axios.get("/products");
        setAllP(data);
        console.log("this is datata", data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchproducts();
  }, []);

  const product = allP.find((p) => p._id === id); // Get the current product

    const handleUpdate = async (e) => {
        e.preventDefault();
    }
const [title, setTitle] = useState(product.title);
//   const [price, setPrice] = useState(product.price);
//   const [description, setDescription] = useState(product.description);
//   const [image, setImage] = useState(product.image);
  return (
    <>
    <Nav />
<div className='mx-auto my-auto'>
    <form onSubmit={handleUpdate}>
    <div className="mb-4">
          <label className="block mb-1">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <button
    type="submit"
    className="bg-blue-500 text-white p-2 rounded"
  >
    Update Product
  </button>
    </form>
    </div>
    
   
  </>
  )
}

export default Editt