import ProductCard from "./ProductCard";
import data from "../context/contextApi";
import { useContext } from "react";
import SectionHeading from "./SectionHeading";

export default function AllDealsPage() {
  const { allDealData } = useContext(data);
  return (
    <div className="px-8 sm:px-20 mt-8">
      <SectionHeading sectionHeading="Flash Sales" />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))]  md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 mt-8  md:gap-8">
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
