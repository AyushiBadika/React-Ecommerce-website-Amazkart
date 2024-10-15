import { Link } from "react-router-dom";
import SectionHeading from "./SectionHeading";

const AboutUs = () => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 pt-16">
        {/* <h1 className="text-4xl font-bold text-red-600 mb-8 text-center">About Us</h1> */}
        <SectionHeading sectionHeading="About Us" />

        <div className="bg-white shadow-lg rounded-lg p-3 sm:p-8 my-8">
          <h2 className="text-2xl font-semibold  mb-4">Our Story</h2>
          <p className="text-gray-700 mb-4">AmazKart was born out of a passion for delivering high-quality products and an exceptional shopping experience to our customers. Since our inception, we've been committed to revolutionizing online shopping with cutting-edge technology and customer-centric approaches.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white shadow-lg rounded-lg p-3 sm:p-8">
            <h2 className="text-2xl font-semibold  mb-4">Our Mission</h2>
            <p className="text-gray-700">To provide a seamless, secure, and enjoyable e-commerce experience that empowers customers to find and purchase the products they love with ease and confidence.</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-3 sm:p-8">
            <h2 className="text-2xl font-semibold  mb-4">Our Vision</h2>
            <p className="text-gray-700">To become the go-to platform for online shopping, known for our vast selection, competitive prices, and unparalleled customer service.</p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-3 sm:p-8 my-8">
          <h2 className="text-2xl font-semibold  mb-4">What Sets Us Apart</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Full-featured e-commerce platform with user authentication</li>
            <li>Comprehensive product management system</li>
            <li>Integrated wishlist and shopping cart functionality</li>
            <li>Secure payment processing with Stripe</li>
            <li>Real-time data synchronization with Firebase</li>
            <li>Mobile-responsive design for shopping on-the-go</li>
          </ul>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">Join Us on Our Journey</h2>
          <p className="text-gray-700 mb-4">We're constantly evolving and improving. Your feedback and support drive us to be better every day.</p>
          <Link to="/all-products">
            <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition duration-300">Start Shopping Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
