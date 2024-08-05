import imgUrl from "../assets/signUpPage.avif";
import { FcGoogle } from "react-icons/fc";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//firebase
import { auth, db } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import data from "../context/contextApi";

export default function SignUp() {
  const { cart, wishlist } = useContext(data);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { email, name, password } = formData;

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //user register with email and password
  const handleUserSignUpWithEmailAndPassword = async (e) => {
    e.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);

      if (user) {
        await setDoc(doc(db, "Users", user.user.uid), {
          name: name,
          email: email,
          cart: cart,
          wishlist: wishlist,
        });
        navigate("/sign-in");
      }
    } catch (error) {
      console.error(error);
    }
  };
  //user register with google
  const handleUserSignUpWithGoogle = async (e) => {
    e.preventDefault();
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      if (result) {
        await setDoc(doc(db, "Users", result.user.uid), {
          name: result.user.displayName,
          email: result.user.email,
        });
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex  h-[calc(90vh-70px)] mt-10 items-center gap-28">
      <img src={imgUrl} alt="Shop Now" className="w-1/2  lg:block hidden " />
      <div className="  w-full px-8 md:px-32 lg:px-0 lg:w-1/4">
        <h2 className="text-2xl font-bold mb-4 ">Create an account</h2>
        <p className="text-sm text-gray-600 mb-6 font-bold">
          Enter your details below
        </p>

        <form>
          <div className="">
            <div className="relative text-gray-400 mb-4">
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                className="w-full px-3 pt-4 pb-2  border-b outline-none  border-gray-300  focus:outline-none peer"
                required
              />
              <label
                className={`absolute left-2  peer-focus:text-[10px] peer-focus:top-0 ${
                  name != "" ? "top-0 text-[10px]" : "top-3 "
                }`}
              >
                Name
              </label>
            </div>
            <div className="relative text-gray-400 mb-4">
              <input
                type="text"
                name="email"
                value={email}
                onChange={handleChange}
                className="w-full px-3 pt-4 pb-2 border-b outline-none  border-gray-300  focus:outline-none peer"
                required
              />
              <label
                className={`absolute left-2  peer-focus:text-[10px] peer-focus:top-0 ${
                  email != "" ? "top-0 text-[10px]" : "top-3 "
                }`}
              >
                Email
              </label>
            </div>

            <div className="relative text-gray-400">
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                className="w-full px-3 pt-4 pb-2 border-b outline-none  border-gray-300  focus:outline-none peer"
                required
              />
              <label
                className={`absolute left-2  peer-focus:text-[10px] peer-focus:top-0 ${
                  password != "" ? "top-0 text-[10px]" : "top-3 "
                }`}
              >
                Password
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300 mt-6"
            onClick={handleUserSignUpWithEmailAndPassword}
          >
            Create Account
          </button>
        </form>

        <button
          className="w-full mt-4 py-2 px-4 border border-gray-300 rounded-md flex  gap-3 items-center justify-center hover:bg-gray-50 transition duration-300"
          onClick={handleUserSignUpWithGoogle}
        >
          <FcGoogle />
          Sign up with Google
        </button>

        <p className="text-sm text-center mt-6">
          Already have account?
          <Link to="/sign-in" className="text-blue-500 hover:underline ml-1">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
