import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import SectionHeading from "./SectionHeading";

export default function CategoryPage() {
  const { category } = useParams();
  const [categoryData, setCategoryData] = useState([]);
  const scrollView = useRef(null);

  const location = useLocation();

  useEffect(() => {
    scrollView.current.scrollIntoView({ behavior: "smooth" });
  }, [location]);

  const fetchCategoryData = async () => {
    try {
      const response = await fetch(`https://ayushibadika.koyeb.app/categories/${category}`);
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
    <div className="px-8 md:px-20 mt-8">
      <div ref={scrollView}></div>
      <SectionHeading sectionHeading={`${category.slice(0, 1).toUpperCase() + category.slice(1)}'s category`} />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))]  md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 mt-8  md:gap-8 ">
        {categoryData?.length > 0 &&
          categoryData.map((product, index) => {
            return (
              <div key={index}>
                <ProductCard key={index} imgUrl={product?.images[0]} productName={product.title} rating={product.rating} noOfRating={product.noOfReviews} mrp={product?.pricing?.mrp} cost={product?.pricing?.cost} id={product.id} discount={product.pricing.discount} />
              </div>
            );
          })}
      </div>
    </div>
  );
}
