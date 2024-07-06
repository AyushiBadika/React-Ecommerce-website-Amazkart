import { useContext } from "react";
import data from "../context/contextApi";
import ProductCard from "./ProductCard";

export default function Wishlist() {
  const { wishlist } = useContext(data);
  return (
    <div className="flex flex-wrap justify-center gap-8 mt-12">
      {wishlist?.length > 0 &&
        wishlist.map((product, index) => (
          <ProductCard
            key={index}
            imgUrl={product?.images[0]}
            productName={product.title}
            rating={product.rating}
            noOfRating={product.noOfReviews}
            mrp={product?.pricing?.mrp}
            cost={product?.pricing?.cost}
            id={product.id}
            discount={product.pricing.discount}
          />
        ))}
    </div>
  );
}

// imgUrl,
// rating,
// noOfRating,
// price,
// productName,
// {
//     rank: 8,
//     asin: "B073VMC9RY",
//     product_title:
//       "Quick Heal | Antivirus Pro | 1 user | 1 Year | Email Delivery in 1 Hour - no CD",
//     product_price: "₹424.00",
//     product_star_rating: "4.3",
//     product_num_ratings: 13572,
//     product_url: "https://www.amazon.in/dp/B073VMC9RY",
//     product_photo:
//       "https://images-eu.ssl-images-amazon.com/images/I/61enqjIAiGL._AC_UL900_SR900,600_.jpg",
//     rank_change_label: null,
//   },
