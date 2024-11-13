import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import SectionHeading from "./SectionHeading";

export default function SearchPage() {
  const { searchQuery } = useParams();
  const [searchedData, setSearchedData] = useState([]);

  const fetchSearchData = async () => {
    try {
      const response = await fetch(`https://ayushibadika.koyeb.app/search/${searchQuery}`);
      const result = await response.json();
      setSearchedData(result);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchSearchData();
  });

  return (
    <div className="xl:px-20 lg:px-18 md:px-12 px-4 mt-8 ">
      <SectionHeading sectionHeading="Search Results" />
      <div className="flex gap-8 mt-12">
        <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(150px,1fr))]  lg:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 ">
          {searchedData?.length > 0 &&
            searchedData.map((product, index) => {
              return (
                <div key={index}>
                  <ProductCard key={index} imgUrl={product?.images[0]} productName={product.title} rating={product.rating} noOfRating={product.noOfReviews} mrp={product?.pricing?.mrp} cost={product?.pricing?.cost} id={product.id} discount={product.pricing.discount} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
