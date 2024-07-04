import { signInWithEmailAndPassword } from "firebase/auth";
import imgUrl from "../assets/signUpPage.avif";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
export default function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function signIN(e) {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex h-[calc(100vh-70px)] mt-6 items-center gap-28 ">
      <img src={imgUrl} alt="Shop Now" className="w-1/2 h-full " />
      <div className="   w-1/4">
        <h2 className="text-2xl font-bold mb-4 ">Login to Exclusive</h2>
        <p className="text-sm text-gray-600 mb-6 font-bold">
          Enter your details below
        </p>

        <form onSubmit={signIN}>
          <div className="">
            <div className="relative text-gray-400">
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

          <div className="flex justify-between items-center">
            <button
              type="submit"
              className=" bg-red-500 text-white py-2 px-8  rounded-md hover:bg-red-600 transition duration-300 mt-6"
            >
              Login
            </button>
            <p className="text-sm text-center mt-6">
              {"Don't have account?"}
              <Link
                to="/sign-up"
                className="text-blue-500 hover:underline ml-1"
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
