import Category from "./Category";
import HeroSection from "./HeroSection";
import FlashSale from "./FlashSale";
import BestSeller from "./BestSeller";
import bannerImage from "../assets/banner2.png";
import Products from "./Products";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function Home() {
  const scrollView = useRef(null);

  const location = useLocation();

  useEffect(() => {
    scrollView.current.scrollIntoView({ behavior: "smooth" });
  }, [location]);

  return (
    <>
      <div ref={scrollView}></div>
      <HeroSection />
      <div className="xl:px-20 lg:px-18 md:px-12 px-4">
        <FlashSale />
        <Category />
        <BestSeller />
        <img src={bannerImage} />
        <Products />
      </div>
    </>
  );
}
