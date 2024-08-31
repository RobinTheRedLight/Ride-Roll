/* eslint-disable @typescript-eslint/no-explicit-any */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useUpdatePaymentMutation } from "../../../../redux/features/user/userApi";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface FullPayFormProps {
  bookingData: {
    price: number;
    id: string;
  };
}

interface PaymentResponse {
  data: any;
}

const FullPayForm: React.FC<FullPayFormProps> = ({ bookingData }) => {
  const [updatePayment] = useUpdatePaymentMutation();
  const { price, id } = bookingData;
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState<string>("");
  const [clientSecret, setClientSecret] = useState<string>("");
  const [processing, setProcessing] = useState<boolean>(false);
  const [transactionId, setTransactionId] = useState<string>("");

  useEffect(() => {
    if (price > 0) {
      fetch("http://localhost:5000/api/rentals/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price }),
      })
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

      const payment = {
        id: id,
      };
      updatePayment(payment);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Payment Completed",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    setProcessing(false);
  };

  return (
    <>
      <form className="checkout-form" onSubmit={handleSubmit}>
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
        <p className="text-green-500">
          Transaction complete with transactionId: {transactionId}
        </p>
      )}
    </>
  );
};

export default FullPayForm;
