import { useContext } from "react";
import { productContext } from "../utils/Context";
import { Link } from "react-router-dom";

function Nav() {
  const [products , setProducts] = useContext(productContext);
  let diffcat = products && products.reduce((acc,cv) => [...acc , cv.category] ,[]);
  diffcat = [...new Set(diffcat)];
  const color =() => {
    return `rgba(${(Math.random() * 255).toString()},${(Math.random() * 255).toString()},${(Math.random() * 255).toString()},0.7)`
  }
  return (
   

          <nav className='w-[23%] bg-zinc-100 h-screen p-3 pt-6' >
      <Link  className='white-space-nowrap shadow-md border border-blue-200 hover:bg-blue-500 transition duration-300 hover:text-white text-blue-400 text-xl font-semibold p-2   rounded-md m-6 ' to='/addproducts'>Add New Product</Link> 
      <hr className='w-[80%] mt-7 mx-auto' />
      <h1 className='text-blue-400 text-2xl mb-3 p-3'> Category Filter</h1>
      {diffcat.map((c,i) => ( 
        <div key={i} className='w-[80%] ' >
        <Link to={`/?category=${c}`} className='flex items-center '>
          <span style={{backgroundColor: color()}} className='bg-blue-300 h-[15px] w-[15px] rounded-full mr-1' ></span>{" "}{c} </Link>
      </div>
      ))}

     
        
    </nav>
     

  )
}

export default Nav