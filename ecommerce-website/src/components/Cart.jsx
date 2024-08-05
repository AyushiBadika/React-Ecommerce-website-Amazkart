import { useContext, useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

import data from "../context/contextApi";
import SectionHeading from "./SectionHeading";
import emptyCart from "../assets/empty-cart.png";
import App from "./Stripe/CheckoutForm";
import { Link } from "react-router-dom";

export default function Cart() {
  // img name quantity price
  const { cart, setCart } = useContext(data);
  const [total, setTotal] = useState(0);
  const [shipping, setShipping] = useState(5);

  useEffect(() => {
    cart?.forEach((element) => {
      setTotal(
        (prev) => prev + Number(element.cost) * Number(element.quantity)
      );
    });
  }, []);

  useEffect(() => {
    if (total > 99) {
      setShipping(0);
    } else {
      setShipping(5);
    }
  }, [total]);

  function handleQuantity(action, index) {
    if (action === "inc") {
      setTotal((prev) => prev + Number(cart[index].cost));
      setCart((prev) => {
        const temp = [...prev];
        temp[index] = {
          ...temp[index],
          quantity: temp[index].quantity + 1,
        };
        return temp;
      });
    } else {
      setTotal((prev) => prev - Number(cart[index].cost));
      setCart((prev) => {
        const temp = [...prev];
        temp[index].quantity > 1
          ? (temp[index] = {
              ...temp[index],
              quantity: temp[index].quantity - 1,
            })
          : temp.splice(index, 1);
        return temp;
      });
    }
  }

  return (
    <div className="flex flex-col   ">
      <div className="px-4 md:px-12 lg:px-20  mt-8">
        {total > 0 && <SectionHeading sectionHeading="Cart" />}
      </div>
      <div className="flex flex-col flex-wrap justify-center gap-8 mt-12   md:px-12 px-4">
        {cart?.length > 0 &&
          cart.map((item, index) => (
            <div
              className="flex items-center justify-between bg-white rounded px-4 py-4 "
              key={index}
            >
              <Link to={`/product/${cart[index].id}`} className="w-[30%]">
                <div className="flex items-center gap-2 ">
                  <img src={item.imgUrl} alt="" className="w-10" />
                  <p className="font-bold">{item.productName}</p>
                </div>
              </Link>
              <p>${item.cost}</p>
              <div className="flex gap-2 items-center border px-2 rounded">
                <p>{item.quantity}</p>
                <div>
                  <IoIosArrowUp
                    className="cursor-pointer"
                    onClick={() => handleQuantity("inc", index)}
                  />
                  <IoIosArrowDown
                    className="cursor-pointer"
                    onClick={() => handleQuantity("dec", index)}
                  />
                </div>
              </div>
              <div>${Number(item.cost) * Number(item.quantity)}</div>
            </div>
          ))}
      </div>
      {total > 0 ? (
        <div className="mt-20 w-full flex flex-col  md:flex-row gap-8 sm:px-20 md:px-8 lg:px-32 px-4">
          <div className="md:w-[40%] border-2 border-black p-4 flex flex-col justify-center items-center  rounded">
            <h3 className="font-semibold self-start mb-2">Cart Total</h3>
            <div className="flex justify-between border-b-2 border-black py-3 w-full ">
              <p>SubTotal </p>
              <p>${total} </p>
            </div>
            <div className="flex justify-between border-b-2 border-black py-3 w-full ">
              <p>Shipping </p>
              <p>${shipping} </p>
            </div>
            <div className="flex justify-between  border-black py-3  w-full ">
              <p>Total </p>
              <p>${Number(total) + Number(shipping)} </p>
            </div>
          </div>
          <div className="md:w-[60%] border-2 border-black p-4 rounded self-start w-full">
            <h3 className="font-semibold self-start mb-2 ">Checkout</h3>
            <App total={Number(total) + Number(shipping)} />
          </div>
        </div>
      ) : (
        <div className="self-center">
          <img src={emptyCart} className="w-96 " />
          <div className="text-center text-3xl font-bold">Cart Empty!</div>
        </div>
      )}
    </div>
  );
}
