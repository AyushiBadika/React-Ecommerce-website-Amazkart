import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

import { useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Navbar() {
  const [userDetails, setUserDetails] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);

  async function fetchUserData() {
    auth.onAuthStateChanged(async (user) => {
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
      } else console.log("User is not logged in");
    });
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  async function handleLogout() {
    try {
      auth.signOut();
      console.log("userLogged out");
      setUserDetails(null);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <header className="flex justify-between items-center  xl:px-20 lg:px-18 md:px-12 px-2 pt-6 pb-2">
      <h1 className="text-2xl font-bold tracking-wide">
        {" "}
        <Link to="/">Exclusive </Link>
      </h1>
      <ul className="lg:flex xl:gap-12 lg:gap-6 hidden gap-4">
        <li className="hover:underline font-semibold cursor-pointer">
          <Link to="/">Home </Link>
        </li>
        <li className="hover:underline font-semibold cursor-pointer">
          <Link to="/contact">Contact </Link>
        </li>
        <li className="hover:underline font-semibold cursor-pointer">
          <Link to="/about">About</Link>
        </li>
        <li className="hover:underline font-semibold cursor-pointer">
          <Link to="/sign-up">Sign Up</Link>
        </li>
      </ul>
      <div className="flex gap-4 items-center relative">
        <GiHamburgerMenu
          className="lg:hidden block  cursor-pointer text-xl"
          onClick={() => {
            setMenuVisible(!menuVisible);
          }}
        />
        <ul
          className={`${
            menuVisible ? "blcok" : "hidden"
          } absolute top-full   bg-white shadow-sm   rounded -left-6`}
        >
          <li className="hover:underline font-semibold cursor-pointer border-b px-8 py-4">
            <Link to="/">Home </Link>
          </li>
          <li className="hover:underline font-semibold cursor-pointer border-b px-8 py-4">
            <Link to="/contact">Contact </Link>
          </li>
          <li className="hover:underline font-semibold cursor-pointer border-b px-8 py-4">
            <Link to="/about">About</Link>
          </li>
          <li className="hover:underline font-semibold cursor-pointer border-b px-8 py-4">
            <Link to="/sign-up">Sign Up</Link>
          </li>
        </ul>

        <div className="relative hidden lg:block">
          <input
            type="text"
            className="bg-gray-200 rounded-md py-2 pl-4 w-[300px] text-sm"
            placeholder="What are you looking for?"
          />
          <SearchIcon className="absolute right-2 top-1/2 -translate-y-1/2" />
        </div>
        <Link to="/wishlist">
          <FavoriteBorderIcon />
        </Link>
        <Link to="/cart">
          {" "}
          <ShoppingCartIcon />
        </Link>
        <div className="relative">
          {userDetails ? (
            <>
              <FaRegUserCircle className="text-2xl peer" />
              <ul
                className={`${"absolute  bg-white z-50 peer-hover:block hidden hover:block w-[200px]  rounded right-1/2 translate-x-1/2 shadow-md"}`}
              >
                <li className="p-1 px-4 rounded">{userDetails?.name}</li>
                <li
                  onClick={handleLogout}
                  className="bg-red-600 text-white p-1 px-4 rounded"
                >
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
