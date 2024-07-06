import { useState, useRef, useEffect } from "react";
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
  // const [currentImage, setCurrentImage] = useState(0);

  const scrollContainerRef = useRef(null);
  const scroll = (scrollOffset) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollOffset,
        behavior: "smooth",
      });
    }
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (currentImage === images.length - 1 || currentImage === 0) {
  //       setCurrentImage((prev) => (prev === 0 ? prev + 1 : prev - 1));
  //       setFlag(!flag);
  //     }
  //     if (flag) {
  //       scroll(1125);
  //       console.log("true", currentImage);
  //     } else {
  //       scroll(-1125);
  //       console.log("ffale");
  //     }
  //     console.log(flag, currentImage);
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log("hi");
  //     currentImage < images.length - 1
  //       ? () => {
  //           console.log("kpk");
  //           currentImage = currentImage + 1;
  //           scroll(1125);
  //         }
  //       : () => {
  //           console.log("jbuvy");
  //           currentImage = currentImage - 1;
  //           scroll(-1125);
  //         };
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);
  // function scrollBanner() {
  //   setCurrentImage((prev) => {
  //     return (prev + 1) % images.length;
  //   });
  //   scrollContainerRef.style.transform = `translateX(-${currentImage * 100}%)`;
  // }
  // setInterval(scrollBanner, 1000);

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
          <img
            key={index}
            src={image}
            className=" "
            // className={`${currentImage === index ? "block" : "hidden"}`}
          />
        ))}
      </div>

      <div className="flex gap-4 mt-4 lg:pl-20 pl-8">
        <div className=" w-[40px] h-[40px] bg-gray-200 rounded-full flex justify-center items-center ">
          <FaArrowLeft
            className="cursor-pointer "
            onClick={() =>
              // setCurrentImage((prev) => {
              //   return prev === 0 ? images.length - 1 : prev - 1;
              // })
              scroll(-1405)
            }
          />
        </div>
        <div className=" w-[40px] h-[40px] bg-gray-200 rounded-full flex justify-center items-center">
          <FaArrowRight
            className="cursor-pointer"
            onClick={() =>
              // setCurrentImage((prev) => {
              //   return prev === images.length - 1 ? 0 : prev + 1;
              // })
              scroll(1405)
            }
          />
        </div>
      </div>
    </div>
  );
}
