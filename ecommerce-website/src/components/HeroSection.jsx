import { useRef } from "react";
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
  const scrollContainerRef = useRef(null);
  const scroll = (scrollOffset) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="md:block hidden">
      <div
        className="flex overflow-x-scroll scrollbarWidth overflow-y-hidden mt-6  "
        style={{
          scrollbarWidth: "none",
        }}
        ref={scrollContainerRef}
      >
        {images.map((image, index) => (
          <img key={index} src={image} className=" " />
        ))}
      </div>

      <div className="flex gap-4 mt-4 lg:pl-20 pl-8">
        <div className=" w-[40px] h-[40px] bg-gray-200 rounded-full flex justify-center items-center ">
          <FaArrowLeft
            className="cursor-pointer "
            onClick={() => scroll(-1405)}
          />
        </div>
        <div className=" w-[40px] h-[40px] bg-gray-200 rounded-full flex justify-center items-center">
          <FaArrowRight
            className="cursor-pointer"
            onClick={() => scroll(1405)}
          />
        </div>
      </div>
    </div>
  );
}
