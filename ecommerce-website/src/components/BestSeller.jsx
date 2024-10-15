import { useContext, useEffect, useState, useRef } from "react";
import ProductCard from "./ProductCard.jsx";
import SectionHeading from "./SectionHeading.jsx";
import Button from "./Button.jsx";
import data from "../context/contextApi.jsx";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

export default function BestSeller() {
  //states
  const [firstFour, setFirstFour] = useState([]);
  const { allBestSellers } = useContext(data);

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
    const temp = allBestSellers.slice(0, 10);
    setFirstFour([...temp]);
  }, [allBestSellers]);

  //ui
  return (
    <div className=" pt-6 mb-10">
      <div className="flex justify-between items-center mb-8 ">
        <SectionHeading sectionHeading="Best Selling Products" />
        <Link to="/best-sellers">
          <Button buttonText="View All" />
        </Link>
      </div>
      <div className="relative w-full ">
        <div ref={scrollContainerRef} className="flex flex-grow gap-4 overflow-x-scroll scrollbar-hide mb-8 py-8 " style={{ scrollbarWidth: "none" }}>
          {firstFour &&
            firstFour.map((product, index) => {
              return <ProductCard key={index} imgUrl={product?.images[0]} productName={product.title} rating={product.rating} noOfRating={product.noOfReviews} mrp={product?.pricing?.mrp} cost={product?.pricing?.cost} id={product.id} discount={product.pricing.discount} />;
            })}
        </div>

        <div className="">
          <div className="absolute xl:-left-16 xl:top-1/2   w-[40px] h-[40px] bg-gray-200 rounded-full flex justify-center items-center  top-1/2 -translate-y-1/2 -left-5">
            <FaArrowLeft className="cursor-pointer " onClick={() => scroll(-200)} />
          </div>
          <div className="absolute xl:-right-16  xl:top-1/2 -translate-y-1/2 w-[40px] h-[40px] bg-gray-200 rounded-full flex justify-center items-center  top-1/2  -right-5">
            <FaArrowRight className="cursor-pointer" onClick={() => scroll(200)} />
          </div>
        </div>
      </div>
    </div>
  );
}
