import ProductCard from "./ProductCard";
import data from "../context/contextApi";
import { useContext } from "react";

export default function AllDealsPage() {
  const { allDealData } = useContext(data);
  console.log(allDealData);
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))]  gap-8 my-20 px-20">
      {allDealData?.length > 0 &&
        allDealData.map((product, index) => {
          return (
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
          );
        })}
    </div>
  );
}
// imgUrl,
//   rating,
//   noOfRating,
//   price,
//   productName,
//   id,
//   discount,
