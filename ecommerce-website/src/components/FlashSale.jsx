import Button from "./Button";
import SectionHeading from "./SectionHeading";
import ProductCard from "./ProductCard";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { useRef } from "react";
import { Link } from "react-router-dom";
import data from "../context/contextApi";
import { useEffect, useState } from "react";
import { useContext } from "react";

export default function FlashSale() {
  const [tenDealData, setTenDealData] = useState([]);
  const scrollContainerRef = useRef(null);
  const { allDealData } = useContext(data);
  const [time, setTime] = useState(1500);

  useEffect(() => {
    let timer = setInterval(() => {
      setTime((time) => {
        if (time === 0) {
          clearInterval(timer);
          return 0;
        } else return time - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    const temp = allDealData.slice(0, 10);
    setTenDealData([...temp]);
  }, [allDealData]);

  const scroll = (scrollOffset) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="md:my-12 mt-10 mb-12">
      <div className="flex  justify-between ">
        <div className="flex md:w-[60%] lg:w-[45%] flex-col lg:flex-row gap-4 md:gap-2 justify-between">
          <SectionHeading sectionHeading="Flash Sales" />
          <div className="flex gap-1 items-center ">
            <div className="flex flex-col items-center">
              <p className="font-semibold text-sm ">Days</p>
              <p className="text-xl">03</p>
            </div>
            <p className="font-bold text-lg">:</p>
            <div className="flex flex-col items-center">
              <p className="font-semibold text-sm ">Hours</p>
              <p className="text-xl">23</p>
            </div>
            <p className="font-bold text-lg">:</p>
            <div className="flex flex-col items-center">
              <p className="font-semibold text-sm ">Minutes</p>
              <p className="text-xl">{`${Math.floor(time / 60)}`.padStart(2, 0)}</p>
            </div>
            <p className="font-bold text-lg">:</p>
            <div className="flex flex-col items-center">
              <p className="font-semibold text-sm ">Seconds</p>
              <p className="text-xl"> {`${time % 60}`.padStart(2, 0)}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-4 mt-2">
          <div className=" w-[35px] h-[35px] bg-gray-200 rounded-full flex justify-center items-center">
            <FaArrowLeft className="cursor-pointer " onClick={() => scroll(-200)} />
          </div>
          <div className=" w-[35px] h-[35px] bg-gray-200 rounded-full flex justify-center items-center">
            <FaArrowRight className="cursor-pointer" onClick={() => scroll(200)} />
          </div>
        </div>
      </div>

      <div className=" ">
        <div ref={scrollContainerRef} className="flex flex-grow gap-4 overflow-x-scroll scrollbar-hide mb-8 py-8" style={{ scrollbarWidth: "none" }}>
          {tenDealData?.length > 0 &&
            tenDealData.map((product, index) => {
              return <ProductCard key={index} imgUrl={product.images[0]} productName={product.title} rating={product.rating} noOfRating={product.noOfReviews} mrp={product?.pricing?.mrp} cost={product?.pricing?.cost} id={product.id} discount={product.pricing.discount} />;
            })}
        </div>
      </div>
      <div className="inline-block absolute left-1/2 -translate-x-1/2 ">
        <Link to="/flash-deals" className="flex justify-center">
          <Button buttonText="View All Products"></Button>
        </Link>
      </div>
    </div>
  );
}
