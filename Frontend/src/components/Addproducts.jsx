import axios from '../utils/axios';
import React, { useEffect, useState } from 'react'
import { Form, useNavigate } from 'react-router-dom'
import Nav from './Nav';

function Addproducts() {

    const [products, setProducts] = useState([]);
    const [formData,setFormData] = useState({
        title: '',
        price: '',
        category: '',
        image: '',
        description: ''
    });

   const Navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
       
        try {
            const response = await axios.post('/addproducts' , formData);
            console.log("products added" , response.data);
            fetchProducts();
            Navigate('/');
        } catch (error) {
            console.error(error);
        }
    }

    const fetchProducts = async () => {

        try {
            const response = await axios.get('/products');
            setProducts(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchProducts();
    },[]);

 const handlechange =(e) =>{
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    })
 }

  return (
    <>
    <Nav />
    <div className='w-full flex flex-col justify-center items-center p-4 mx-auto my-auto'>
        <h1 className=' text-xl font-semibold text-zinc-700 ' > Add New Product</h1>
        <form className='w-[60%] flex flex-col items-center justify-center' onSubmit={handleSubmit} >
          <input type="text" name='title'  placeholder="Product Name" className='w-full p-2 mt-4 rounded-xl border border-gray-300' value={formData.name} onChange={handlechange} />
          <div className='w-full flex justify-between'>
          <input type="number" name='price'  placeholder="Product Price" className='w-[48%] p-2 mt-4 rounded-xl border border-gray-300' value={formData.price} onChange={handlechange} />
          <input type="text" name='category'  placeholder="Product Category" className='w-[48%] p-2 mt-4 rounded-xl border' value={formData.category} onChange={handlechange} />
          </div>
          <input type="url" name='image'  placeholder="Product Image URL" className='w-full p-2 mt-4 rounded-xl border' value={formData.image} onChange={handlechange} />
          <textarea rows="7" name='description'  placeholder="Product Description" className='w-full  resize-none p-2 mt-4 rounded-xl border ' value={formData.description} onChange={handlechange}></textarea>

            <button type='submit' className='mt-2 bg-blue-500 text-xl font-semibold rounded-md text-white self-center py-1 px-3'>Submit</button>
          </form>
        
    </div>
    </>
  )
}

export default Addproducts