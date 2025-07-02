"use client";


import { FaSeedling, FaComments, FaShoppingCart, FaChartLine } from "react-icons/fa";

const features = [
  {
    icon: <FaSeedling className="text-green-600 text-3xl" />,
    title: "Smart Crop Management",
    desc: "Monitor crop health, get disease alerts, and optimize yields with AI-powered insights.",
  },
  {
    icon: <FaComments className="text-green-600 text-3xl" />,
    title: "Expert Consultations",
    desc: "Connect instantly with agriculture experts for advice and problem-solving.",
  },
  {
    icon: <FaShoppingCart className="text-green-600 text-3xl" />,
    title: "Agri Marketplace",
    desc: "Buy and sell seeds, fertilizers, and equipment securely on our platform.",
  },
  {
    icon: <FaChartLine className="text-green-600 text-3xl" />,
    title: "Analytics & Reports",
    desc: "Track your farm’s performance and make data-driven decisions.",
  },
];

const FeaturesSection = () => (
  <section className="py-16 px-4 bg-white">
    <h2 className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-10">
      Why Choose AgriTech?
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
      {features.map((f, i) => (
        <div key={i} className="bg-green-50 rounded-xl p-8 shadow hover:shadow-lg transition flex flex-col items-center text-center">
          {f.icon}
          <h3 className="mt-4 text-xl font-semibold text-green-800">{f.title}</h3>
          <p className="mt-2 text-gray-600">{f.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default FeaturesSection;