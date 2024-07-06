import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import SectionHeading from "./SectionHeading";

export default function SearchPage() {
  const { searchQuery } = useParams();
  const [searchedData, setSearchedData] = useState([]);

  const fetchSearchData = async () => {
    try {
      const response = await fetch(
        `https://ecommercebackend-wveh.onrender.com/search/${searchQuery}`
      );
      const result = await response.json();
      setSearchedData(result);
    } catch (error) {
      console.error(error);
    }
  };

  fetchSearchData();
  const ratingRef = useRef();
  const priceGTRef = useRef();
  const priceLTRef = useRef();
  const reviewsRef = useRef();
  const discountRef = useRef();

  const [filterParams, setFilterParams] = useState({
    rating: "",
    pricegt: "",
    pricelt: "",
    discount: "",
    reviews: "",
  });

  // http://ecommercebackend-wveh.onrender.com/products?rating=${rating}&pricegt=${pricegt}&pricelt=${pricelt}&discount=${discount}&reviews=${reviews}

  //   const handleChecked = () => {
  //     console.log("hi");
  //     // setFilterParams(() => {
  //     //   return {
  //     //     rating: ratingRef.current.value,
  //     //     pricegt: priceGTRef.current.value,
  //     //     pricelt: priceLTRef.current.value,
  //     //     discount: discountRef.current.value,
  //     //     reviews: reviewsRef.current.value,
  //     //   };
  //     // });
  //   };
  //   console.log(filterParams);

  return (
    <div className="xl:px-20 lg:px-18 md:px-12 px-4 mt-8 ">
      <SectionHeading sectionHeading="Search Results" />
      <div className="flex gap-8 mt-12">
        {/* <form className="flex flex-col gap-4 bg-white rounded shadow-md p-8 w-[1/5]">
          <div className="flex gap-2">
            <label>Rating</label>
            <select type="checkbox">
              <option value="4">Above 4</option>
              <option value="3">Above 3</option>
              <option value="2">Above 2</option>
              <option value="1">Above 1</option>
            </select>
          </div>
          <div className="flex gap-2">
            <label>Price</label>
            <div>
              <div>Min</div>
              <input type="number" className="border w-8" />
            </div>
            <div>
              <div>Max</div>
              <input type="number" className="border w-8" />
            </div>
          </div>

          <div className="flex gap-2">
            <label>Discount</label>
            <select type="checkbox">
              <option value="80">Above 80%</option>
              <option value="70">Above 70%</option>
              <option value="60">Above 60%</option>
              <option value="50">Above 50%</option>
            </select>
          </div>
          <div className="flex gap-2">
            <label>No of reviews</label>
            <select type="checkbox">
              <option value="400">Above 400</option>
              <option value="300">Above 300</option>
              <option value="200">Above 200</option>
              <option value="100">Above 100</option>
            </select>
          </div>
          <button type="submit">Apply Filters</button>
        </form> */}
        <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(150px,1fr))]  lg:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 ">
          {searchedData?.length > 0 &&
            searchedData.map((product, index) => {
              return (
                <div key={index}>
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
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
