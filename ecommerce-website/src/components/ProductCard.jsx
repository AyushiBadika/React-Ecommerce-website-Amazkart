import { useContext } from "react";
import data from "../context/contextApi";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";

export default function ProductCard({
  imgUrl,
  rating,
  noOfRating,
  cost,
  mrp,
  productName,
  id,
  discount,
}) {
  const navigate = useNavigate();
  const fetchCategoryData = async () => {
    try {
      const response = await fetch(
        `https://ecommercebackend-wveh.onrender.com/products/${id}
`
      );
      const result = await response.json();

      setAllCategories(result);
    } catch (error) {
      console.log(error);
    }
  };

  function handleProductClick(id) {
    navigate(`/product/${id}`);
  }

  return (
    <div className="product-card relative  group flex flex-col h-full py-8 px-6 rounded bg-white">
      <div className="absolute right-4">
        {/* {wishlist.find((item) => item.rank === id) === -1 ? (
          <FaHeart />
        ) : (
          <FaRegHeart />
        )} */}
      </div>
      <div className="bg-red-600 w-12 text-white flex justify-center items-center rounded absolute right-2 top-2">
        -{discount}
      </div>
      <div
        onClick={(e) => handleProductClick(id)}
        className="w-40 h-40 self-center cursor-pointer"
      >
        <img src={imgUrl} alt={productName} className="w-full h-full" />
      </div>
      <h4 className="font-bold mt-4 h-[2rem]">{productName}</h4>
      <div className="flex justify-between items-center h-[3rem]">
        <p>
          ${cost} <span className="line-through"> ${mrp}</span>
        </p>
        <div className="flex gap-2">
          <div className="font-bold">{rating}</div>
          {noOfRating ? <p>({noOfRating})</p> : ""}
        </div>
      </div>
      <button className="bg-black w-full absolute left-0 h-[50px] text-white font-bold top-1/2 opacity-0 group-hover:opacity-100">
        Add to Cart
      </button>
    </div>
  );
}
