import { signInWithEmailAndPassword } from "firebase/auth";
import imgUrl from "../assets/signUpPage.avif";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../utils/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

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

  async function signIN(e) {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password).then((data) => {
        navigate("/");
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex h-[calc(90vh-70px)] mt-10 items-center gap-28 ">
      <img src={imgUrl} alt="Shop Now" className="w-1/2 lg:block hidden" />
      <div className="   w-full px-8 md:px-32 lg:px-0 lg:w-1/4">
        <h2 className="text-2xl font-bold mb-4 ">Login to Exclusive</h2>
        <p className="text-sm text-gray-600 mb-6 font-bold">
          Enter your details below
        </p>

        <form onSubmit={signIN}>
          <div className="">
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

          <div className="w-full flex flex-col justify-between">
            <div>
              <button
                type="submit"
                className="w-full bg-red-500 text-white py-2 px-8  rounded-md hover:bg-red-600 transition duration-300 mt-6"
              >
                Login
              </button>
              <button
                className="w-full mt-4 py-2 px-4 border border-gray-300 rounded-md flex  gap-3 items-center justify-center hover:bg-gray-50 transition duration-300"
                onClick={handleUserSignUpWithGoogle}
              >
                <FcGoogle />
                Sign in with Google
              </button>
            </div>
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
