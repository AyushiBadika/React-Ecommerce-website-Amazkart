import { useContext, useEffect, useState, useRef } from "react";
import ProductCard from "./ProductCard.jsx";
import SectionHeading from "./SectionHeading.jsx";
import Button from "./Button.jsx";
import data from "../context/contextApi.jsx";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

export default function Products() {
  //states
  const [firstTwenty, setFirstTwenty] = useState([]);
  const { allProducts } = useContext(data);

  const scrollContainerRef = useRef(null);

  const scroll = (scrollOffset) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollOffset,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const temp = allProducts.slice(0, 20);
    setFirstTwenty([...temp]);
  }, [allProducts]);

  //ui
  return (
    <div className="  my-12">
      <div className="flex justify-between items-center mb-8 ">
        <SectionHeading sectionHeading="Explore Our products" />
        {/* <h1 className="font-bold text-2xl">Explore Our products</h1> */}
        <div className="flex gap-4">
          <div className=" w-[40px] h-[40px] bg-gray-200 rounded-full flex justify-center items-center ">
            <FaArrowLeft
              className="cursor-pointer "
              onClick={() => scroll(-200)}
            />
          </div>
          <div className=" w-[40px] h-[40px] bg-gray-200 rounded-full flex justify-center items-center">
            <FaArrowRight
              className="cursor-pointer"
              onClick={() => scroll(200)}
            />
          </div>
        </div>
      </div>
      <div className="relative w-full ">
        <div
          ref={scrollContainerRef}
          className="flex flex-grow gap-4 overflow-x-scroll scrollbar-hide mb-8 py-8 "
          style={{ scrollbarWidth: "none" }}
        >
          {firstTwenty &&
            firstTwenty.map((product, index) => {
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
        <div className="inline-block absolute left-1/2 -translate-x-1/2 ">
          <Link to="/all-products" className="flex justify-center">
            <Button buttonText="View All Products"></Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
