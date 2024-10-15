/* eslint-disable react/prop-types */
import { useContext } from "react";
import data from "../context/contextApi";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ imgUrl, rating, noOfRating, cost, mrp, productName, id, discount }) {
  const navigate = useNavigate();

  const { wishlist, setWishlist, allProducts, cart, setCart } = useContext(data);

  function handleProductClick(id) {
    navigate(`/product/${id}`);
  }

  function handleWishlist(id) {
    const item = wishlist?.find((item) => item.id == id);
    if (item) {
      const index = wishlist?.indexOf(item);
      const temp = [...wishlist];
      temp.splice(index, 1);
      setWishlist(temp);
    } else {
      setWishlist((prev) => [...prev, allProducts.find((prod) => prod.id == id)]);
    }
  }

  function handleCartItems(id, imgUrl, cost, productName) {
    const item = cart.find((item) => item.id == id);
    if (item) {
      setCart((prev) => {
        const productIndex = prev?.indexOf(item);
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

  return (
    <div className="product-card relative  group flex flex-col h-full py-8 px-6 rounded bg-white">
      <div className="absolute right-4 top-4 flex gap-2 items-center ">
        <div className="bg-red-600 w-12 text-white flex justify-center items-center rounded text-sm">-{discount}%</div>
        <div onClick={() => handleWishlist(id)}>{wishlist?.find((item) => item.id == id) === undefined ? <FaRegHeart className="cursor-pointer" /> : <FaHeart fill="red" className="cursor-pointer" />}</div>
      </div>
      <div onClick={() => handleProductClick(id)} className="md:w-40 md:h-40 w-36 h-36 self-center cursor-pointer">
        <img src={imgUrl} alt={productName} className="w-full h-full" />
      </div>
      <h4 className="font-bold mt-4 mb-2">{productName.slice(0, 12)}...</h4>
      <div className="flex justify-between items-center ">
        <p>
          ${cost.length > 3 ? cost.slice(0, 2) + ".." : cost} <span className="line-through"> ${mrp.length > 3 ? mrp.slice(0, 2) + ".." : mrp}</span>
        </p>
        <div className="flex ">
          <div className="font-bold">{rating}</div>
          {noOfRating ? <p>({noOfRating})</p> : ""}
        </div>
      </div>
      <button onClick={() => handleCartItems(id, imgUrl, cost, productName)} className="bg-black w-full absolute left-0 h-[40px] text-white font-bold top-1/2 opacity-0 group-hover:opacity-100 active:scale-95">
        Add to Cart
      </button>
    </div>
  );
}
