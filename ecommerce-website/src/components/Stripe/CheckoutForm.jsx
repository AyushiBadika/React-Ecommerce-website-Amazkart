import React, { useContext, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { auth } from "../../utils/firebase";
import Stripe from "stripe";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import data from "../../context/contextApi";
const stripeIntent = new Stripe(
  "sk_test_51PGIe7QU3ClQZhcFNG4JA8Ew522giJGnJ7lwr5FgnSzQ4et6mNpfW3jTrxSUuJNNpHlUEIeGd7aQdTzoxDjgDlRa003y9eQSk2"
);
const CheckoutForm = ({ total }) => {
  const elements = useElements();
  const stripe = useStripe();
  const [isPaying, setIsPaying] = useState(false);
  const { setCart } = useContext(data);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (auth?.currentUser) {
      const totalAmount = Number(total) * 100;

      if (!stripe || !elements) {
        return;
      }

      const card = elements.getElement(CardElement);

      if (card == null) {
        return;
      }

      try {
        setIsPaying(true);
        const paymentIntent = await stripeIntent.paymentIntents.create({
          amount: totalAmount,
          currency: "usd",
          automatic_payment_methods: {
            enabled: true,
          },
        });
        if (paymentIntent?.status === "requires_payment_method") {
          console.log("confirming");
          const confirmPayment = await stripe.confirmCardPayment(
            paymentIntent.client_secret,
            {
              payment_method: {
                card: card,
              },
            }
          );
          if (confirmPayment?.error) {
            toast.error(confirmPayment.error.message);
          } else if (confirmPayment?.paymentIntent?.status === "succeeded") {
            toast.success("Order successful!");
            setCart([]);
            navigate("/");
          } else {
            toast.error("Payment failed! Please try again");
          }
        } else {
          toast.error("Payment failed! Please try again");
        }
      } catch (error) {
        console.error("Payment failed", error);
        toast.error("Payment failed! Please try again");
      } finally {
        setIsPaying(false);
      }
    } else {
      toast("Please sign in to place order!");
    }
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className={`bg-red-600 h-10 items-center flex justify-center text-white w-full px-8 py-3 rounded font-semibold active:scale-95`}
        type="submit"
        disabled={!stripe || isPaying}
      >
        {isPaying ? <div class="loader"></div> : "Pay"}
      </button>
    </form>
  );
};

const stripePromise = loadStripe(
  "pk_test_51PGIe7QU3ClQZhcF5ZPYHjp4Ox299lf5iH0FDuW2Q2YTSmmVIGNNAmM7p7YHiMafYVNbrZRPKS3dzH9gMtwfTrVc00wKOJxl2U"
);

const App = ({ total }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm total={total} />
    </Elements>
  );
};

export default App;
