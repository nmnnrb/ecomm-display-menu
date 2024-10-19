import React, { useContext, useEffect, useState } from "react";
import { productContext } from "../utils/Context";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import Nav from "./Nav";

function Edit() {
  const [products, setProducts] = useContext(productContext);
  const { id } = useParams();
  const pId = Number(id);
  const Navigate = useNavigate();
  const [allP, setAllP] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

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

  useEffect(() => {
    const product = allP.find((p) => p._id === id); // Get the current product


    if (product) {
      setTitle(product.title);
      setPrice(product.price);
      setDescription(product.description);
      setImage(product.image);
    }
  
  }, [allP,id]);
  
  let product = allP.find((p) => p._id === id);
  if (!product) {
    return <div>Loading...</div>;
  }

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      // Update the product in the database
      await axios.put(`/products/edit/${pId}`, {
        title,
        price,
        description,
        image,
      });

      // Update the product in the context state
      const updatedProducts = allP.map((p) => 
        p._id === id ? { ...p, title, price, description, image } : p
      );
      setProducts(updatedProducts);

      // Redirect to the details page
      Navigate(-1);
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };
  product = allP.find((p) => p._id === id);
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <Nav />
    <div className="w-[70%] mx-auto my-auto p-10">
      <h1 className="text-4xl font-bold mb-5">Edit Product</h1>
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
        <div className="mb-4">
          <label className="block mb-1">Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Image URL:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Update Product
        </button>
      </form>
    </div>
    </>
  );
}

export default Edit;
