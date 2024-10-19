import { Link, useLocation } from "react-router-dom";
import Nav from "./Nav";
import { productContext } from "../utils/Context";
import { useContext, useEffect, useState } from "react";
import axios from "../utils/axios";

function Home() {
  const [products] = useContext(productContext);
  console.log("product from context" , products);
  const { search } = useLocation();
  const category = decodeURIComponent(search.split("=")[1]) || "undefined";
  console.log(category);

  const [filteredData, setfilteredData] = useState([]);

  const getproductCategory = async () => {
    try {
      const { data } = await axios.get(`/products/category/${category}`);
      if(category != "undefined"){
        setfilteredData(data);
        }else{
          setfilteredData(products);
        }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getproductCategory();
  }, [products, category]);

  // useEffect(() => {
  //   getproductCategory();
  // }, []);

  const [pproducts, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.log("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []); // Fetch products when the component mounts

  return (
    <>
      <Nav />

      <div className="w-full w-[85%]  pl-12  pt-[5%] mt-[2%] flex  flex-wrap  overflow-x-hidden overflow-y-auto">
        {filteredData.length > 0 ? (
          filteredData.reverse().map((item, index) => (
            <Link
              key={index}
              to={`/details/${index}`}
              className=" hover:text-blue-500 transition duration-100  card w-[20%] h-[45vh] mr-8 mb-9 p-  border  rounded-xl overflow-hidden shadow-md hover:shadow-blue-700 "
            >
              <div
                className=" hover:scale-110 transition duration-300  w-full h-[75%] bg-contain bg-center bg-no-repeat   "
                style={{ backgroundImage: `url(${item.image})` }}
              ></div>
            <div className="flex flex-col  justify-center mt-2 hover:text-blue-600 text-blue-500 flex-wrap ">
            <h1 className="text-center text-zinc-800 transition duration-300 font-bold ">
                {" "}
                ${item.price}{" "}
              </h1>
              <h2 className="text-center  transition duration-300 font-bold ">
                {" "}
                {item.title}{" "}
              </h2>
            </div>
            </Link>
          ))
        ) : (
          <h1 className="w-screen text-6xl flex justify-center items-center  m-12">
            Loading...
            <br /> Inventory is Coming
          </h1>
        )}
      </div>
    </>
  );
}

export default Home;
