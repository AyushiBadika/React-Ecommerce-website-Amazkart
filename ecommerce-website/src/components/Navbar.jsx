import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { FaRegUserCircle } from "react-icons/fa";
import { FaHome, FaPhone, FaInfoCircle, FaUserPlus } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

import { useContext, useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import data from "../context/contextApi";

export default function Navbar() {
  const [userDetails, setUserDetails] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const { searchQuery, setSearchQuery, cart, wishlist, setCart, setWishlist, isLoggedIn, setIsLoggedIn } = useContext(data);

  async function fetchUserData() {
    auth.onAuthStateChanged(async (user) => {
      const docRef = doc(db, "Users", user?.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
        setIsLoggedIn(true);
      } else {
        console.log("User is not logged in");
      }
    });
  }

  async function updateUserData() {
    const docRef = doc(db, "Users", auth?.currentUser?.uid);

    const newData = await {
      wishlist: wishlist,
      cart: cart,
    };

    await setDoc(docRef, newData, {
      merge: true,
    }).then(() => console.log("data updated"));
  }

  useEffect(() => {
    updateUserData();
  }, [cart, wishlist]);

  useEffect(() => {
    fetchUserData();
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      setIsLoggedIn(false);
      setCart([]);
      setWishlist([]);
      navigate("/");

      setUserDetails(null);
    } catch (error) {
      console.error(error);
    }
  }

  const navigate = useNavigate();
  const handleSearch = () => {
    navigate(`/products/${searchQuery}`);
  };

  return (
    <header className="flex justify-between items-center  xl:px-20 lg:px-18 md:px-12 px-2 pt-6 pb-2">
      <h1 className="text-2xl font-bold tracking-wide">
        <Link to="/">Amazkart</Link>
      </h1>
      <ul className="lg:flex xl:gap-12 lg:gap-6 hidden gap-4">
        <li className="hover:underline font-semibold cursor-pointer">
          <Link to="/">Home </Link>
        </li>
        <li className="hover:underline font-semibold cursor-pointer">
          <Link to="/contact">Contact </Link>
        </li>
        <li className="hover:underline font-semibold cursor-pointer">
          <Link to="/about-us">About</Link>
        </li>
        {!isLoggedIn && (
          <li className="hover:underline font-semibold cursor-pointer">
            <Link to="/sign-in">Sign In</Link>
          </li>
        )}
      </ul>
      <div className={`${menuVisible ? "block" : "hidden"} w-[100vw] h-[100vh] absolute left-0 bottom-0 right-0 top-0  z-10`} onClick={() => setMenuVisible(false)}></div>
      <div className="flex gap-4 items-center relative z-10">
        <GiHamburgerMenu
          className="lg:hidden block cursor-pointer text-xl z-10"
          onClick={() => {
            setMenuVisible(!menuVisible);
          }}
        />

        <div className={`${menuVisible ? "block" : "hidden"} lg:hidden absolute top-full bg-white shadow-sm rounded -left-6 z-200 `}>
          <Link className="flex items-center gap-8 hover:underline font-semibold cursor-pointer border-b  p-4" onClick={() => setMenuVisible(false)} to="/">
            <FaHome />
            Home
          </Link>
          <Link className=" flex items-center gap-8  hover:underline font-semibold cursor-pointer border-b p-4" onClick={() => setMenuVisible(false)} to="/contact">
            <FaPhone />
            Contact
          </Link>
          <Link className="flex items-center gap-8 hover:underline font-semibold cursor-pointer border-b p-4" onClick={() => setMenuVisible(false)} to="/about-us">
            <FaInfoCircle />
            About
          </Link>
          <Link className="flex items-center gap-8  hover:underline font-semibold cursor-pointer border-b p-4" onClick={() => setMenuVisible(false)} to="/sign-up">
            <FaUserPlus />
            Sign Up
          </Link>
        </div>

        <div className="relative hidden lg:block">
          <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} type="text" className="bg-gray-200 rounded-md py-2 pl-4 w-[300px] text-sm" placeholder="What are you looking for?" />
          <SearchIcon className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer" onClick={handleSearch} />
        </div>
        <Link to="/wishlist">
          <FavoriteBorderIcon />
        </Link>
        <Link to="/cart" className="relative">
          <ShoppingCartIcon />
          <p className="w-5 h-5 bg-red-600 text-white flex justify-center items-center rounded-full absolute  -top-2 -right-2">{cart.length}</p>
        </Link>
        <div className="relative">
          {userDetails ? (
            <>
              <FaRegUserCircle className="text-2xl peer" />
              <ul className={`${"absolute bg-white z-100 peer-hover:block hidden hover:block w-[200px] rounded right-[28%] shadow-md"}`}>
                <li className="p-2 px-4 rounded">{userDetails?.name}</li>
                <li onClick={handleLogout} className="bg-red-600 text-white p-2 px-4 rounded">
                  logout
                </li>
              </ul>{" "}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </header>
  );
}
