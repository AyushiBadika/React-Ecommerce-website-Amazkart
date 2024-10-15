import { CiFacebook } from "react-icons/ci";
import { CiTwitter } from "react-icons/ci";
import { CiInstagram } from "react-icons/ci";
import { CiLinkedin } from "react-icons/ci";

export default function Footer() {
  return (
    <div className="bg-black text-white py-20 mt-28 md:px-20 w-full flex flex-col  ">
      <div className=" grid md:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] grid-cols-[repeat(auto-fill,minmax(160px,1fr))] pl-12 md:pl-0 ">
        <div className="flex flex-col gap-4 mb-8">
          <h4 className="text-xl ">Exclusive</h4>
          <p>Subscribe</p>
          <p>Get 10% off your first order</p>
          <input type="text" placeholder="Enter your email" className="w-3/4 rounded p-2" />
        </div>
        <div className="flex flex-col gap-4 mb-8">
          <h4 className="text-xl ">Support</h4>
          <p>111 Bijay Sarani, Dhaka</p>
          <p>exclusive@gmail.com</p>
          <p>+123456789</p>
        </div>
        <div className="flex flex-col gap-4 mb-8">
          <h4 className="text-xl ">Account</h4>
          <p>My Account</p>
          <p>Login/Register</p>
          <p>Cart</p>
          <p>Wishlist</p>
          <p>Shop</p>
        </div>
        <div className="flex flex-col gap-4 mb-8">
          <h4 className="text-xl ">Quick Link</h4>
          <p>Privacy Policy</p>
          <p>Terms Of Use</p>
          <p>FAQ</p>
          <p>Contact</p>
        </div>
      </div>
      <div className="  flex justify-center mt-8 gap-8">
        <CiFacebook fontSize={"25px"} />
        <CiTwitter fontSize={"25px"} />
        <CiInstagram fontSize={"25px"} />
        <CiLinkedin fontSize={"25px"} />
      </div>
    </div>
  );
}
