import { useContext } from "react";
import data from "../context/contextApi";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

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

  function handleProductClick(id) {
    navigate(`/product/${id}`);
  }

  function handleWishlist(id) {
    const item = wishlist?.find((item) => item.id == id);
    if (item) {
      const index = wishlist?.indexOf(item);
      const temp = [...wishlist];
      temp.splice(index, 1);
      console.log("remove", id);
      setWishlist(temp);
    } else {
      console.log("added", id);
      setWishlist((prev) => [...prev, allProducts[id - 1]]);
    }
  }

  function handleCartItems(id, imgUrl, cost, productName) {
    const item = cart.find((item) => item.id == id);
    if (item) {
      setCart((prev) => {
        const productIndex = prev.indexOf(item);
        prev[productIndex].quantity = prev[productIndex].quantity + 1;

        return prev;
      });
    } else {
      setCart((prev) => [
        ...prev,
        {
          id: id,
          imgUrl: imgUrl,
          productName: productName,
          cost: cost,
          quantity: 1,
        },
      ]);
    }
  }

  const { wishlist, setWishlist, allProducts, cart, setCart } =
    useContext(data);

  // console.log(wishlist.find((item) => item.id == id));
  return (
    <div className="product-card relative  group flex flex-col h-full py-8 px-6 rounded bg-white">
      <div className="absolute right-4" onClick={() => handleWishlist(id)}>
        {wishlist?.find((item) => item.id == id) === undefined ? (
          <FaRegHeart />
        ) : (
          <FaHeart />
        )}
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
        <div className="flex ">
          <div className="font-bold">{rating}</div>
          {noOfRating ? <p>({noOfRating})</p> : ""}
        </div>
      </div>
      <button
        onClick={() => handleCartItems(id, imgUrl, cost, productName)}
        className="bg-black w-full absolute left-0 h-[50px] text-white font-bold top-1/2 opacity-0 group-hover:opacity-100"
      >
        Add to Cart
      </button>
    </div>
  );
}
