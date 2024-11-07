/* eslint-disable @typescript-eslint/no-unused-vars */
// components/Payment.js
import { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

const Payment = () => {
  const { data: session } = useSession();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  const handlePaymentMethodChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedPaymentMethod(e.target.value);
  };
  const handlePayment = async () => {
    try {
      const response = await axios.post("/api/payment", {
        method: selectedPaymentMethod,
        userId: session?.user.id, // Pass the user ID
      });
      // Handle the response as necessary (e.g., redirect to payment provider)
      setPaymentStatus("Payment session created successfully!");
    } catch (error) {
      console.error("Payment error:", error);
      setPaymentStatus("Payment failed. Please try again.");
    }
  };
  return (
    <div>
      <h2>Select Payment Method</h2>
      <select
        value={selectedPaymentMethod}
        onChange={handlePaymentMethodChange}
      >
        <option value="">--Select Payment Method--</option>
        <option value="credit_card">Credit Card</option>
        <option value="paypal">PayPal</option>
        <option value="khalti">Khalti</option>
      </select>
      <button onClick={handlePayment}>Pay Now</button>
      {paymentStatus && <p>{paymentStatus}</p>}
    </div>
  );
};

export default Payment;
