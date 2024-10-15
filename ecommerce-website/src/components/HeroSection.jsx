import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import img1 from "../assets/carousal-image-1.jpg";
import img2 from "../assets/carousal-image-2.jpg";
import img3 from "../assets/carousal-image-3.jpg";
import img4 from "../assets/carousal-image-4.jpg";
import img5 from "../assets/carousal-image-5.jpg";
import img6 from "../assets/carousal-image-6.jpg";
import img7 from "../assets/carousal-image-7.jpg";

const images = [img1, img2, img3, img4, img5, img6, img7];
export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => {
      handleNext();
    }, 5000);

    return () => clearTimeout(id);
  }, [currentIndex]);

  const handlePrev = () => {
    if (currentIndex === 0) setCurrentIndex(images.length - 1);
    else setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentIndex === images.length - 1) setCurrentIndex(0);
    else setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div className="md:block hidden">
      <div className="flex overflow-hidden scrollbarWidth  mt-6  ">
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {images.map((image, index) => (
            <img key={index} src={image} className=" " />
          ))}
        </div>
      </div>

      <div className="flex gap-4 mt-4 lg:pl-20 pl-8">
        <div className=" w-[40px] h-[40px] bg-gray-200 rounded-full flex justify-center items-center ">
          <FaArrowLeft className="cursor-pointer " onClick={handlePrev} />
        </div>
        <div className=" w-[40px] h-[40px] bg-gray-200 rounded-full flex justify-center items-center">
          <FaArrowRight className="cursor-pointer" onClick={handleNext} />
        </div>
      </div>
    </div>
  );
}
