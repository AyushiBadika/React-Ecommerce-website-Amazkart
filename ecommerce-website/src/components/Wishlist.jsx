import { useContext } from "react";
import data from "../context/contextApi";
import ProductCard from "./ProductCard";
import emptyWishlist from "../assets/empty-wishlist.png";

export default function Wishlist() {
  const { wishlist } = useContext(data);
  return (
    <div className="my-20">
      {wishlist?.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))]  md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 px-8 sm:px-20 md:gap-8 m-auto ">
          {wishlist.map((product, index) => (
            <ProductCard key={index} imgUrl={product?.images[0]} productName={product.title} rating={product.rating} noOfRating={product.noOfReviews} mrp={product?.pricing?.mrp} cost={product?.pricing?.cost} id={product.id} discount={product.pricing.discount} />
          ))}{" "}
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col w-[100vw]">
          <img src={emptyWishlist} className="w-96" />
          <div className="text-center text-3xl font-bold">Wishlist Empty!</div>
        </div>
      )}
    </div>
  );
}
