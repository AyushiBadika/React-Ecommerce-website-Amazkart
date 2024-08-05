import SectionHeading from "./SectionHeading";
import { Link } from "react-router-dom";
import { useContext } from "react";
import data from "../context/contextApi";

export default function Category() {
  const { allCategories } = useContext(data);

  return (
    <div className="mt-32 mb-20">
      <SectionHeading sectionHeading={"Browse by Category"} />
      <div className="flex gap-10 justify-center flex-wrap mt-8">
        {allCategories.map((item, index) => {
          return (
            <Link
              to={`/category/${item.name.toLowerCase()}`}
              key={index}
              className="border-2 flex justify-center items-center flex-col pb-2"
            >
              <img
                src={item.image}
                alt=""
                className="w-60 h-60 sm:w-40 sm:h-40 "
              />
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
