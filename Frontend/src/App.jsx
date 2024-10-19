import {Link, Route, Routes, useLocation} from 'react-router-dom';
import Home from './components/Home'
import Details from './components/Details';
import Addproducts from './components/Addproducts';
import Edit from './components/Edit';
import Editt from './components/Editt';

function App() {
  const {search , pathname} = useLocation();
  console.log( "hello "  ,search , pathname);
  return (
    <>
    <div className='h-screen w-screen flex' >
      {(search.length > 0 || pathname != "/") &&
       ( <Link className='absolute mx-72 shadow-md border border-blue-200 hover:bg-blue-500 transition duration-300 hover:text-white text-blue-400 p-2 rounded-md m-6 ' to='/'>See All Products</Link> )
      }
    
    <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/details/:id" element={<Details />} />
    <Route path="/addproducts" element={<Addproducts />} />
    <Route path="/edit/:id" element={<Edit />} />
    </Routes>

    </div>
    </>
  )
}

export default App