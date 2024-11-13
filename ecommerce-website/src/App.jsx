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
import Cart from "./components/Cart.jsx";
import ProductPage from "./components/ProductPage.jsx";
import SearchPage from "./components/SearchPage.jsx";
import AboutUs from "./components/About.jsx";

import { Toaster } from "react-hot-toast";
import data from "./context/contextApi.jsx";
export default function App() {
  const [allProducts, setAllProducts] = useState([]);
  const [allDealData, setAllDealData] = useState([]);
  const [allBestSellers, setAllBestSellers] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchBestSellerData();
    fetchDealData();
    fetchAllProductData();
    fetchAllCategories();
  }, []);

  const fetchDealData = async () => {
    try {
      const response = await fetch("https://ayushibadika.koyeb.app/deals");
      const result = await response.json();

      console.log(result);
      setAllDealData([...result]);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchBestSellerData = async () => {
    try {
      const response = await fetch("https://ayushibadika.koyeb.app/bestseller");
      const result = await response.json();
      setAllBestSellers(result);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllCategories = async () => {
    try {
      const response = await fetch("https://ayushibadika.koyeb.app/categories");
      const result = await response.json();

      setAllCategories(result);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchAllProductData = async () => {
    try {
      const response = await fetch("https://ayushibadika.koyeb.app/products");
      const result = await response.json();
      setAllProducts(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <BrowserRouter>
      <div>
        <Toaster />
      </div>
      <data.Provider
        value={{
          allDealData,
          allBestSellers,
          allProducts,
          wishlist,
          setWishlist,
          allCategories,
          cart,
          setCart,
          searchQuery,
          setSearchQuery,
          isLoggedIn,
          setIsLoggedIn,
          setAllProducts,
        }}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/flash-deals" element={<AllDealsPage />} />
          <Route path="/best-sellers" element={<AllBestSellerPage />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/all-products" element={<AllProductPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/product/:product" element={<ProductPage />} />
          <Route path="/products/:searchQuery" element={<SearchPage />} />
        </Routes>
      </data.Provider>
      <Footer />
    </BrowserRouter>
  );
}
