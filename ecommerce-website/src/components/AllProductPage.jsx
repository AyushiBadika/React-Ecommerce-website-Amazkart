import ProductCard from "./ProductCard";
import data from "../context/contextApi";
import { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

export default function AllProductPage() {
  const { allProducts, setAllProducts } = useContext(data);

  const [filterParams, setFilterParams] = useState({
    rating: 0,
    pricegt: 0,
    pricelt: 10000000,
    discount: 0,
    reviews: 0,
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFilterParams({ ...filterParams, [name]: value });
  };

  const fetchAllProductData = async () => {
    try {
      const response = await fetch(`https://ayushibadika.koyeb.app/products?rating=${filterParams.rating}&pricegt=${filterParams.pricegt}&pricelt=${filterParams.pricelt}&discount=${filterParams.discount}&reviews=${filterParams.reviews}`);
      const result = await response.json();
      setAllProducts(result);
    } catch (error) {
      console.error(error);
    }
  };

  const scrollView = useRef(null);

  const location = useLocation();

  useEffect(() => {
    scrollView.current.scrollIntoView({ behavior: "smooth" });
  }, [location]);

  return (
    <>
      <div ref={scrollView}></div>
      <form className="flex flex-wrap gap-8 bg-white rounded shadow-sm py-8 px-8 w-[1/5]">
        <div className="flex gap-2 flex-col">
          <label className="font-bold">Rating</label>
          <select className="border rounded p-2" type="checkbox" name="rating" value={filterParams.rating} onChange={(e) => handleChange(e)}>
            <option value="4">Above 4</option>
            <option value="3">Above 3</option>
            <option value="2">Above 2</option>
            <option value="1">Above 1</option>
            <option value="0">Any</option>
          </select>
        </div>
        <div className="flex gap-2 items-center">
          <label className="font-bold">Price</label>
          <div className="flex flex-col gap-2">
            <div className="font-bold">Min</div>
            <input type="number" className="border w-20 p-2 rounded" name="pricegt" value={filterParams.pricegt} onChange={(e) => handleChange(e)} />
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-bold">Max</div>
            <input type="number" className="border w-20 p-2 rounded" name="pricelt" value={filterParams.pricelt} onChange={(e) => handleChange(e)} />
          </div>
        </div>

        <div className="flex gap-2 flex-col">
          <label className="font-bold">Discount</label>
          <select className="border rounded p-2" type="checkbox" name="discount" value={filterParams.discount} onChange={(e) => handleChange(e)}>
            <option value="80">Above 80%</option>
            <option value="60">Above 60%</option>
            <option value="40">Above 40%</option>
            <option value="20">Above 20%</option>
            <option value="0">Any</option>
          </select>
        </div>
        <div className="flex gap-2 flex-col">
          <label className="font-bold">No of reviews</label>
          <select className="border rounded p-2" type="checkbox" name="reviews" value={filterParams.reviews} onChange={(e) => handleChange(e)}>
            <option value="1250">Above 1250</option>
            <option value="1000">Above 1000</option>
            <option value="750">Above 750</option>
            <option value="500">Above 500</option>
            <option value="0">Any</option>
          </select>
        </div>
        <button
          className="border rounded bg-red-600 self-center h-10  text-white px-4 py-2"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            fetchAllProductData();
          }}
        >
          Apply Filters
        </button>
        <button
          className="border rounded -translate-x-5 bg-red-600 self-center h-10 text-white px-4 py-2"
          onClick={() => {
            setFilterParams({
              rating: 0,
              pricegt: 0,
              pricelt: 10000000,
              discount: 0,
              reviews: 0,
            });
          }}
        >
          Reset
        </button>
      </form>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))]  md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 mt-8 md:gap-8 px-8">
        {allProducts?.length > 0
          ? allProducts.map((product) => {
              return (
                <div key={product.id}>
                  <ProductCard key={product.id} imgUrl={product?.images[0]} productName={product.title} rating={product.rating} noOfRating={product.noOfReviews} mrp={product?.pricing?.mrp} cost={product?.pricing?.cost} id={product?.id} discount={product.pricing.discount} />
                </div>
              );
            })
          : "NO Data Found"}
      </div>
    </>
  );
}
