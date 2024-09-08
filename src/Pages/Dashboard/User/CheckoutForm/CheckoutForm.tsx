/* eslint-disable @typescript-eslint/no-explicit-any */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import "./CheckoutForm.css";
import { useAddRentalMutation } from "../../../../redux/features/user/userApi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

interface CheckoutFormProps {
  bikedData: {
    price: number;
    startTime: string;
    id: string;
  };
}

interface PaymentResponse {
  data: any;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ bikedData }) => {
  const [addRental] = useAddRentalMutation();
  const { price, startTime, id } = bikedData;
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState<string>("");
  const [clientSecret, setClientSecret] = useState<string>("");
  const [processing, setProcessing] = useState<boolean>(false);
  const [transactionId, setTransactionId] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (price > 0) {
      fetch(
        "https://assignment-3-seven-lake.vercel.app/api/rentals/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ price }),
        }
      )
        .then((response) => response.json())
        .then((data: PaymentResponse) => {
          setClientSecret(data.data.client_secret);
        })
        .catch((error) => {
          console.error("Error fetching client secret:", error);
        });
    }
  }, [price]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("Error creating payment method:", error);
      setCardError(error.message || "");
      return;
    } else {
      setCardError("");
    }

    setProcessing(true);

    if (!clientSecret) {
      console.log("No client secret available");
      setProcessing(false);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: "example@example.com",
            name: "example",
          },
        },
      });

    if (confirmError) {
      console.log("Error confirming card payment:", confirmError);
      setProcessing(false);
      return;
    }

    if (paymentIntent && paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);

      const rentalData = {
        bikeId: id,
        startTime: startTime,
      };
      addRental(rentalData);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Payment Completed",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/dashboard/rentals");
    }

    setProcessing(false);
  };

  return (
    <>
      <form className="checkout-form " onSubmit={handleSubmit}>
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
          className="btn btn-outline btn-primary"
          type="submit"
          disabled={!stripe || processing}
        >
          Pay
        </button>
      </form>
      {cardError && <p className="text-red-600">{cardError}</p>}
      {transactionId && (
        <p className="text-green-500 text-center">
          Transaction complete with transactionId: {transactionId}
        </p>
      )}
    </>
  );
};

export default CheckoutForm;
