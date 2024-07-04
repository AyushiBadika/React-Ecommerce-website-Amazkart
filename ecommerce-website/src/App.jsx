import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./components/Home.jsx";
import SignUp from "./components/SignUp.jsx";
import SignIn from "./components/SignIn.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import AllDealsPage from "./components/AllDealsPage.jsx";
import AllBestSellerPage from "./components/AllBestSellerPage.jsx";
import AllProductPage from "./components/AllProductPage.jsx";
import Wishlist from "./components/Wishlist.jsx";
import CategoryPage from "./components/CategoryPage.jsx";

//data
import data from "./context/contextApi.jsx";

import Cart from "./components/Cart.jsx";
import ProductPage from "./components/ProductPage.jsx";

export default function App() {
  const [allProducts, setAllProducts] = useState([]);
  const [allDealData, setAllDealData] = useState([]);
  const [allBestSellers, setAllBestSellers] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [cart, setCart] = useState([
    {
      rank: 1,
      asin: "B07895T7B1",
      product_title:
        "McAfee Antivirus 2024 | 1 Device, 3 Year | Antivirus Internet Security Software| Email Delivery",
      product_price: "₹660.00",
      product_star_rating: "4.2",
      product_num_ratings: 15706,
      product_url: "https://www.amazon.in/dp/B07895T7B1",
      product_photo:
        "https://images-eu.ssl-images-amazon.com/images/I/51rp6aV1sqL._AC_UL900_SR900,600_.jpg",
      rank_change_label: null,
    },
    {
      rank: 2,
      asin: "B08B1SD2HZ",
      product_title:
        "Kaspersky | Total Security | 1 Device | 1 Year | Email Delivery in 1 Hour",
      product_price: "₹459.00",
      product_star_rating: "4.3",
      product_num_ratings: 9331,
      product_url: "https://www.amazon.in/dp/B08B1SD2HZ",
      product_photo:
        "https://images-eu.ssl-images-amazon.com/images/I/61ykGuyH5DL._AC_UL900_SR900,600_.jpg",
      rank_change_label: null,
    },
    {
      rank: 3,
      asin: "B07PQZJ6Y8",
      product_title:
        "K7 Security K7, Total Security, 1 User, 1 Year, Email Delivery In 30 Min, No Cd",
      product_price: "₹315.00",
      product_star_rating: "4.4",
      product_num_ratings: 1328,
      product_url: "https://www.amazon.in/dp/B07PQZJ6Y8",
      product_photo:
        "https://images-eu.ssl-images-amazon.com/images/I/51HB079HbPS._AC_UL900_SR900,600_.jpg",
      rank_change_label: null,
    },
    {
      rank: 4,
      asin: "B0CR6KQ8TF",
      product_title:
        "Bitdefender - 1 Device,1 Year - Mobile Security | Android | Latest Version | Email Delivery in 2 Hours- No CD |",
      product_price: "₹55.00",
      product_star_rating: "4.5",
      product_num_ratings: 239,
      product_url: "https://www.amazon.in/dp/B0CR6KQ8TF",
      product_photo:
        "https://images-eu.ssl-images-amazon.com/images/I/71M1HiAgbbL._AC_UL900_SR900,600_.jpg",
      rank_change_label: null,
    },
  ]);
  const [wishlist, setWishlist] = useState([
    {
      rank: 1,
      asin: "B07895T7B1",
      product_title:
        "McAfee Antivirus 2024 | 1 Device, 3 Year | Antivirus Internet Security Software| Email Delivery",
      product_price: "₹660.00",
      product_star_rating: "4.2",
      product_num_ratings: 15706,
      product_url: "https://www.amazon.in/dp/B07895T7B1",
      product_photo:
        "https://images-eu.ssl-images-amazon.com/images/I/51rp6aV1sqL._AC_UL900_SR900,600_.jpg",
      rank_change_label: null,
    },
    {
      rank: 2,
      asin: "B08B1SD2HZ",
      product_title:
        "Kaspersky | Total Security | 1 Device | 1 Year | Email Delivery in 1 Hour",
      product_price: "₹459.00",
      product_star_rating: "4.3",
      product_num_ratings: 9331,
      product_url: "https://www.amazon.in/dp/B08B1SD2HZ",
      product_photo:
        "https://images-eu.ssl-images-amazon.com/images/I/61ykGuyH5DL._AC_UL900_SR900,600_.jpg",
      rank_change_label: null,
    },
    {
      rank: 3,
      asin: "B07PQZJ6Y8",
      product_title:
        "K7 Security K7, Total Security, 1 User, 1 Year, Email Delivery In 30 Min, No Cd",
      product_price: "₹315.00",
      product_star_rating: "4.4",
      product_num_ratings: 1328,
      product_url: "https://www.amazon.in/dp/B07PQZJ6Y8",
      product_photo:
        "https://images-eu.ssl-images-amazon.com/images/I/51HB079HbPS._AC_UL900_SR900,600_.jpg",
      rank_change_label: null,
    },
    {
      rank: 4,
      asin: "B0CR6KQ8TF",
      product_title:
        "Bitdefender - 1 Device,1 Year - Mobile Security | Android | Latest Version | Email Delivery in 2 Hours- No CD |",
      product_price: "₹55.00",
      product_star_rating: "4.5",
      product_num_ratings: 239,
      product_url: "https://www.amazon.in/dp/B0CR6KQ8TF",
      product_photo:
        "https://images-eu.ssl-images-amazon.com/images/I/71M1HiAgbbL._AC_UL900_SR900,600_.jpg",
      rank_change_label: null,
    },
    {
      rank: 5,
      asin: "B073VMC9S4",
      product_title:
        "Kaspersky | Total Security | 1 Device | 3 Years | Email Delivery in 1 Hour",
      product_price: "₹999.00",
      product_star_rating: "4.5",
      product_num_ratings: 7380,
      product_url: "https://www.amazon.in/dp/B073VMC9S4",
      product_photo:
        "https://images-eu.ssl-images-amazon.com/images/I/61qiv6rgc-L._AC_UL900_SR900,600_.jpg",
      rank_change_label: null,
    },
    {
      rank: 6,
      asin: "B073VKKNN9",
      product_title:
        "Kaspersky | Premium - Total Security (Ultimate Security) | 1 Device | 1 Year | Email Delivery in 1 Hour",
      product_price: "₹449.00",
      product_star_rating: "4.3",
      product_num_ratings: 12685,
      product_url: "https://www.amazon.in/dp/B073VKKNN9",
      product_photo:
        "https://images-eu.ssl-images-amazon.com/images/I/71EYvXOy8KL._AC_UL900_SR900,600_.jpg",
      rank_change_label: null,
    },
    {
      rank: 7,
      asin: "B073VLNGJW",
      product_title:
        "Bitdefender - 1 Computer,3 Years - Total Security | Windows | Latest Version | Email Delivery In 2 Hours- No Cd |",
      product_price: "₹599.00",
      product_star_rating: "4.4",
      product_num_ratings: 11813,
      product_url: "https://www.amazon.in/dp/B073VLNGJW",
      product_photo:
        "https://images-eu.ssl-images-amazon.com/images/I/81JA0Rnl38L._AC_UL900_SR900,600_.jpg",
      rank_change_label: null,
    },
    {
      rank: 8,
      asin: "B073VMC9RY",
      product_title:
        "Quick Heal | Antivirus Pro | 1 user | 1 Year | Email Delivery in 1 Hour - no CD",
      product_price: "₹424.00",
      product_star_rating: "4.3",
      product_num_ratings: 13572,
      product_url: "https://www.amazon.in/dp/B073VMC9RY",
      product_photo:
        "https://images-eu.ssl-images-amazon.com/images/I/61enqjIAiGL._AC_UL900_SR900,600_.jpg",
      rank_change_label: null,
    },
    {
      rank: 9,
      asin: "B073VLGMZ4",
      product_title:
        "McAfee Total Protection 2024 | 1 Device, 3 Year | Antivirus Internet Security Software | Password Manager & Dark Web Monitori",
      product_price: "₹1,499.00",
      product_star_rating: "4.2",
      product_num_ratings: 10723,
      product_url: "https://www.amazon.in/dp/B073VLGMZ4",
      product_photo:
        "https://images-eu.ssl-images-amazon.com/images/I/61aBEUtRBKL._AC_UL900_SR900,600_.jpg",
      rank_change_label: null,
    },
  ]);

  useEffect(() => {
    fetchBestSellerData();
    fetchDealData();
    fetchAllProductData();
    fetchAllCategories();
  }, []);

  const fetchDealData = async () => {
    try {
      const response = await fetch(
        "https://ecommercebackend-wveh.onrender.com/deals"
      );
      const result = await response.json();

      setAllDealData([...result]);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBestSellerData = async () => {
    try {
      const response = await fetch(
        "https://ecommercebackend-wveh.onrender.com/bestseller"
      );
      const result = await response.json();
      setAllBestSellers(result);
    } catch (error) {}
  };

  const fetchAllCategories = async () => {
    try {
      const response = await fetch(
        "https://ecommercebackend-wveh.onrender.com/categories"
      );
      const result = await response.json();

      setAllCategories(result);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAllProductData = async () => {
    try {
      const response = await fetch(
        "https://ecommercebackend-wveh.onrender.com/products"
      );
      const result = await response.json();
      setAllProducts(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BrowserRouter>
      <Navbar />
      <data.Provider
        value={{
          allDealData,
          allBestSellers,
          allProducts,
          wishlist,
          setWishlist,
          allCategories,
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/flash-deals" element={<AllDealsPage />} />
          <Route path="/best-sellers" element={<AllBestSellerPage />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/all-products" element={<AllProductPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/product/:product" element={<ProductPage />} />
        </Routes>
      </data.Provider>
      <Footer />
    </BrowserRouter>
  );
}
