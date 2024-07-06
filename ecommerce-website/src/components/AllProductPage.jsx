import ProductCard from "./ProductCard";
import data from "../context/contextApi";
import { useContext } from "react";

export default function AllProductPage() {
  const { allProducts } = useContext(data);

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))]  lg:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 my-20 px-2 md:px-20 md:gap-8">
      {allProducts?.length > 0 &&
        allProducts.map((product, index) => {
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
