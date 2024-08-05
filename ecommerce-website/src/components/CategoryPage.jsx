import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";

export default function CategoryPage() {
  const { category } = useParams();
  const [categoryData, setCategoryData] = useState([]);

  const fetchCategoryData = async () => {
    try {
      const response = await fetch(
        `https://ecommercebackend-wveh.onrender.com/categories/${category}`
      );
      const result = await response.json();

      setCategoryData(result);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchCategoryData();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))]  md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 my-20 px-8 md:px-20 md:gap-8 ">
        {categoryData?.length > 0 &&
          categoryData.map((product, index) => {
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
    </div>
  );
}
