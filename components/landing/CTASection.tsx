"use client";


import Link from "next/link";

const CTASection = () => (
  <section className="py-16 px-4 bg-gradient-to-r from-green-600 to-green-400 text-white text-center">
    <h2 className="text-3xl md:text-4xl font-bold mb-6">
      Ready to Transform Your Farming Journey?
    </h2>
    <p className="text-lg mb-8">
      Join AgriTech today and experience the future of agriculture.
    </p>
    <Link href="/signup" className="bg-white text-green-700 font-bold py-3 px-10 rounded-full shadow-lg hover:bg-green-50 transition">
      Get Started Now
    </Link>
  </section>
);

export default CTASection;