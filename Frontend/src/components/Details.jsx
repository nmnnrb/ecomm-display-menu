import React, { useContext } from 'react'
import { productContext } from '../utils/Context';
import { Link, useParams } from 'react-router-dom';

function Details() {
  const [products, setProducts] = useContext(productContext);
  const {id} = useParams();
  console.log("the products are " , products);

  return products? (
    <>
    <div className='w-[70%] shadow-xl h-full flex justify-between items-center   mx-auto p-[10%] ' >

    {products.map((item,index) => {
       if(index == id){
       return (
          
<div key={index} className='' >
        <div className='flex gap-16 '>
        <img className=' object-fit w-1/3 h-1/3   shadow-md border-2 hover:scale-125 transition duration-300 overflow-hidden' src={item.image}/>
        <div className='overflow-hidden ' >
        <h1 className='text-5xl font-bold white-space-nowrap'>{item.title}</h1>
        <h2 className='text-3xl mt-2 font-semibold' >${item.price}</h2>
        <p className='mt-3 text-md font-semibold'>{item.description}</p>

                 <Link to={`/edit/${item._id}`} className='text-blue-400 border p-1 rounded-xl border-blue-200 hover:text-blue-500 transition duration-300 mr-4 mt-12'>Edit</Link>
                 <Link to={`/delete/${item._id}`}  className='text-red-400 border p-1 rounded-xl border-red-200 hover:text-red-500 transition duration-300 mr-4 mt-12'>Delete</Link>

        </div>
        </div>
     
    </div> 
      )
      }
    })}
 </div>
    </>

    

  ) : <h1>Loading...</h1>
}

export default Details