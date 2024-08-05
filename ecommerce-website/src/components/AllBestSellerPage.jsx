import ProductCard from "./ProductCard";
import data from "../context/contextApi";
import { useContext } from "react";

export default function AllBestSellerPage() {
  const { allBestSellers } = useContext(data);

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))]  md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 my-20 px-8 sm:px-20 md:gap-8">
      {allBestSellers?.length > 0 &&
        allBestSellers.map((product, index) => {
          return (
            <div key={index}>
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
            </div>
          );
        })}
    </div>
  );
}
