import { useContext } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

import data from "../context/contextApi";

export default function Cart() {
  const { cart, setCart } = useContext(data);

  function handleQuantity(action, index) {
    if (action === "inc") {
      setCart((prev) => {
        const temp = [...prev];
        temp[index] = {
          ...temp[index],
          quantity: temp[index].quantity + 1,
        };
        return temp;
      });
    } else {
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
    <div className="flex flex-col flex-wrap justify-center gap-8 mt-12 xl:px-20 lg:px-18 md:px-12 px-4">
      {cart?.length > 0 &&
        cart.map((item, index) => (
          <div
            className="flex items-center justify-between bg-white rounded px-8 py-4 "
            key={index}
          >
            <div className="flex items-center gap-2 w-[30%]">
              <img src={item.imgUrl} alt="" className="w-10" />
              <p className="font-bold">{item.productName}</p>
            </div>
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
  );
}

// img name quantity price
