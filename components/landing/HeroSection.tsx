"use client";


import { motion } from "framer-motion";
import Link from "next/link";

const HeroSection = () => (
  <section className="flex flex-col items-center justify-center text-center py-20 px-4 bg-gradient-to-br from-green-200 via-green-100 to-white">
    <motion.h1
      className="text-5xl md:text-6xl font-extrabold text-green-900 mb-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      Empowering Agriculture with <span className="text-green-600">Technology</span>
    </motion.h1>
    <motion.p
      className="text-lg md:text-2xl text-gray-700 mb-8 max-w-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.7 }}
    >
      Connect with experts, manage your crops, and grow smarter with AgriTech’s all-in-one platform.
    </motion.p>
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="flex gap-4"
    >
      <Link href="/signup" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition">
        Get Started
      </Link>
      <Link href="/consult" className="bg-white border border-green-600 text-green-700 font-bold py-3 px-8 rounded-full shadow hover:bg-green-50 transition">
        Consult an Expert
      </Link>
    </motion.div>
    <motion.img
      src="/images/landing-hero.png"
      alt="AgriTech Platform"
      className="mt-12 w-full max-w-3xl rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.7 }}
    />
  </section>
);

export default HeroSection;