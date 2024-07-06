import SectionHeading from "./SectionHeading";
import { MdOutlineElectricalServices } from "react-icons/md";

import { FaMale } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";
import { MdChair } from "react-icons/md";
import { MdSportsBaseball } from "react-icons/md";
import { MdDiamond } from "react-icons/md";
import { Link } from "react-router-dom";
import { useContext } from "react";
import data from "../context/contextApi";

//  [
//   {
//     name: "Electronic",
//     icon: <MdOutlineElectricalServices className="text-5xl" />,
//   },
//   {
//     name: "Men",
//     icon: <FaMale className="text-5xl" />,
//   },
//   {
//     name: "Women",
//     icon: <FaFemale className="text-5xl" />,
//   },
//   {
//     name: "Furniture",
//     icon: <MdChair className="text-5xl" />,
//   },
//   {
//     name: "Sports",
//     icon: <MdSportsBaseball className="text-5xl" />,
//   },
//   {
//     name: "Jewellery",
//     icon: <MdDiamond className="text-5xl" />,
//   },
// ];

export default function Category() {
  const { allCategories } = useContext(data);

  return (
    <div className=" mt-32 mb-20">
      <SectionHeading sectionHeading={"Browse by Category"} />
      {/* <h3 className="text-2xl font-bold mb-8 ">Browse by Category</h3> */}
      <div className="flex gap-10 justify-center flex-wrap mt-8">
        {allCategories.map((item, index) => {
          return (
            <Link
              to={`/category/${item.name.toLowerCase()}`}
              key={index}
              className="border-2 flex justify-center items-center  flex-col pb-2"
            >
              <img src={item.image} alt="" className="w-40 h-40" />
              <p className="font-bold mt-2">
                {item.name.slice(0, 1).toUpperCase() +
                  item.name.slice(1).replace("-", " ")}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
