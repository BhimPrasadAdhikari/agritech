"use client";
import { Leaf, Headphones, Microscope } from "lucide-react"; // Importing specific icons for each feature
import { FaLeaf, FaWater } from "react-icons/fa";
import SubscriptionCard from "./SubscriptionCard";
import { useState } from "react";
const SubscriptionPlans = () => {
  const [disabled,setDisabled]= useState(false);
  const onShowButton=(value:boolean)=>{
    setDisabled(value);
  }
  const plans = [
    {
      plan: "Basic",
      price: 10,
      features: [
        {
          icon: <Headphones className="text-green-500" />,
          text: "Expert consultations (1/month)",
        },
        {
          icon: <Leaf className="text-green-500" />,
          text: "Seasonal crop suggestions",
        },
        {
          icon: <FaWater className="text-green-500" />,
          text: "Irrigation alerts",
        },
      ],
      buttonText: "Subscribe Now",
    },
    {
      plan: "Pro",
      price: 30,
      features: [
        {
          icon: <Headphones className="text-green-500" />,
          text: "Unlimited expert consultations",
        },
        {
          icon: <Leaf className="text-green-500" />,
          text: "Real-time crop suggestions",
        },
        {
          icon: <FaWater className="text-green-500" />,
          text: "Irrigation and fertilizer reminders",
        },
        {
          icon: <Microscope className="text-green-500" />,
          text: "Disease detection tools",
        },
      ],
      buttonText: "Get Pro",
    },
    {
      plan: "Premium",
      price: 50,
      features: [
        {
          icon: <Headphones className="text-green-500" />,
          text: "Everything in Pro",
        },
        {
          icon: <FaLeaf className="text-green-500" />,
          text: "Exclusive 1-on-1 expert guidance",
        },
        {
          icon: <Microscope className="text-green-500" />,
          text: "Premium content & tools",
        },
        {
          icon: <Leaf className="text-green-500" />,
          text: "Early access to new features",
        },
      ],
      buttonText: "Go Premium",
    },
  ];

  return (
    <div className="bg-green-50 py-16">
      <h2 className="text-4xl font-bold text-center text-green-800 mb-12">
        Choose Your Plan
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {plans.map((planData, index) => (
          <SubscriptionCard key={index} {...planData} onShowButton={onShowButton} disable={disabled}/>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlans;
