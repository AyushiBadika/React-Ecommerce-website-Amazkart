import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Button from "./Button";
import { FaRegHeart } from "react-icons/fa";
import { MdDeliveryDining } from "react-icons/md";
import { GiReturnArrow } from "react-icons/gi";

import ProductCard from "./ProductCard";
import SectionHeading from "./SectionHeading";
import data from "../context/contextApi";

export default function ProductPage() {
  const { cart, setCart } = useContext(data);
  const [productDetails, setProductDetails] = useState({});
  const [relatedProducts, setRelatedProducts] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { product } = useParams();
  const [speaking, setSpeaking] = useState(false);
  const { id, category, description, images, noOfReviews, pricing, rating, title } = productDetails;

  function handleCartQuantity(id, imgUrl, cost, productName) {
    const item = cart?.find((item) => item.id == id);

    if (item) {
      setCart((prev) => {
        const productIndex = prev?.indexOf(item);
        prev[productIndex].quantity += quantity;

        return prev;
      });
    } else {
      setCart((prev) => [
        ...prev,
        {
          id: id,
          imgUrl: imgUrl,
          productName: productName,
          cost: cost,
          quantity: quantity,
        },
      ]);
    }
  }

  const fetchProduct = async () => {
    try {
      const response = await fetch(`https://ayushibadika.koyeb.app/product/${product}`);

      const result = await response.json();
      setProductDetails(result);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRelatedProducts = async () => {
    try {
      const response = await fetch(`https://ayushibadika.koyeb.app/categories/${category}`);

      const result = await response.json();
      setRelatedProducts(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchRelatedProducts();
  }, [productDetails]);
  const scrollView = useRef(null);

  const location = useLocation();

  useEffect(() => {
    scrollView.current.scrollIntoView({ behavior: "smooth" });
  }, [location]);

  return (
    <>
      <div ref={scrollView}></div>
      <div className="flex gap-12 justify-center items-center mt-8 mb-20 flex-col lg:flex-row p-4">
        <div className="flex gap-2">
          <div className="flex gap-2 flex-col">
            {images?.map((image, index) => (
              <img
                src={image}
                alt=""
                key={index}
                className="w-[100px] h-[60px] md:h-[100px]  rounded"
                onClick={() => {
                  setCurrentIndex(index);
                }}
              />
            ))}
          </div>
          <div>
            <img src={images?.[currentIndex]} alt="" className="w-[30rem] rounded" />
          </div>
        </div>
        <div>
          <div className="flex gap-2 flex-col ">
            <h3 className="font-bold">{title}</h3>
            <div className="flex gap-3 items-center ">
              <p className="font-bold">{rating}</p>
              <p className="text-gray-500 text-sm">({noOfReviews} reviews) |</p>
              <p className="text-sm text-green-300"> In Stock</p>
            </div>
            <p>
              ${pricing?.cost} <span className="line-through ml-2 ">${pricing?.mrp}</span>
            </p>
            <p className="font-semibold">
              {description}{" "}
              <span
                className="cursor-pointer"
                onClick={() => {
                  const synth = window.speechSynthesis;
                  const utterance = new SpeechSynthesisUtterance(description);
                  utterance.onstart = () => {
                    setSpeaking(true);
                  };

                  utterance.onend = () => {
                    setSpeaking(false);
                  };
                  synth.speak(utterance);
                }}
              >
                {speaking ? "🔇" : "🔊"}
              </span>
            </p>
          </div>
          <hr className="border my-4" />
          <div className="flex gap-4 items-center">
            <div className="flex gap-4 border items-center">
              <button
                className="border-r px-4 py-2 text-xl font-bold"
                onClick={() =>
                  setQuantity((prev) => {
                    return prev > 0 ? prev - 1 : 0;
                  })
                }
              >
                -
              </button>
              {quantity}
              <button className="border-l px-4 py-2 text-xl font-bold" onClick={() => setQuantity((prev) => prev + 1)}>
                +
              </button>
            </div>
            <div
              onClick={() => {
                handleCartQuantity(id, images?.[0], pricing?.cost, title);
              }}
            >
              <button className={`bg-red-600 text-white px-2 py-3 rounded font-semibold active:scale-95 md:text-lg text-sm`}>Add to Cart</button>
            </div>
            <div className="border-2 p-2 rounded">
              <FaRegHeart />
            </div>
          </div>
          <div className="border-2 rounded mt-8 ">
            <div className="flex gap-6 items-center mb-4 border-b-2 p-4">
              <MdDeliveryDining className="text-6xl" />
              <div>
                <p className="font-bold">Free Delivery</p>
                <p className="font-bold text-xs">Enter your postal code for Delivery Availability</p>
              </div>
            </div>
            <div className="flex gap-8 items-center p-4">
              <GiReturnArrow className="text-5xl" />
              <div>
                <p className="font-bold">Return Delivery</p>
                <p className="font-bold text-xs">
                  Free 30 Days Returns. <span className="underline">Details</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 md:px-20 ">
        {relatedProducts?.length > 0 && <SectionHeading sectionHeading="Related Item" />}

        <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))]  md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 mt-8 md:gap-8">
          {relatedProducts?.length > 0 &&
            relatedProducts.map((product, index) => {
              return (
                <div key={index}>
                  <ProductCard imgUrl={product?.images[0]} productName={product.title} rating={product.rating} noOfRating={product.noOfReviews} mrp={product?.pricing?.mrp} cost={product?.pricing?.cost} id={product.id} discount={product.pricing.discount} />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
