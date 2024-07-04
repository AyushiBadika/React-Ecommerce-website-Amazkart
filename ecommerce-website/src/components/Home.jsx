import Category from "./Category";
import HeroSection from "./HeroSection";
import FlashSale from "./FlashSale";
import BestSeller from "./BestSeller";
import bannerImage from "../assets/banner2.png";
import Products from "./Products";

export default function Home() {
  return (
    <>
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
