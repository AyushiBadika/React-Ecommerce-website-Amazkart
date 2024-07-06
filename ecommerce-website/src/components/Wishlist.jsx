import { useContext } from "react";
import data from "../context/contextApi";
import ProductCard from "./ProductCard";
import emptyWishlist from "../assets/empty-wishlist.png";

export default function Wishlist() {
  const { wishlist } = useContext(data);
  return (
    <div className="flex flex-wrap justify-center gap-8 mt-12">
      {wishlist?.length > 0 ? (
        wishlist.map((product, index) => (
          <ProductCard
            key={index}
            imgUrl={product?.images[0]}
            productName={product.title}
            rating={product.rating}
            noOfRating={product.noOfReviews}
            mrp={product?.pricing?.mrp}
            cost={product?.pricing?.cost}
            id={product.id}
            discount={product.pricing.discount}
          />
        ))
      ) : (
        <div className="self-center">
          <img src={emptyWishlist} className="w-96 " />
          <div className="text-center text-3xl font-bold">Wishlist Empty!</div>
        </div>
      )}
    </div>
  );
}
