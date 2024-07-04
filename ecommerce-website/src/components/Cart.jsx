import { useContext } from "react";
import data from "../context/contextApi";

export default function Cart() {
  const { cart } = useContext(data);
  return (
    <div className="flex flex-wrap justify-center gap-8 mt-12">
      {cart?.length > 0 &&
        cart.map((item, index) => (
          <div>
            <div>
              <img src={item.product_photo} alt="" />
              <p></p>
            </div>
          </div>
        ))}
    </div>
  );
}

// img name quantity price
