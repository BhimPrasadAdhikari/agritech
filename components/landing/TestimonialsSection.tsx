"use client";
import Image from "next/image";


const testimonials = [
  {
    name: "Ramesh, Farmer",
    text: "AgriTech helped me detect crop diseases early and connect with experts. My yield improved by 30%!",
    img: "/images/testimonial1.png",
  },
  {
    name: "Sunita, Agri-Expert",
    text: "I love how easy it is to consult with farmers and make a real impact using this platform.",
    img: "/images/testimonial2.png",
  },
  {
    name: "AgroMart",
    text: "Selling our products on AgriTech has expanded our reach and increased our sales.",
    img: "/images/testimonial3.png",
  },
];

const TestimonialsSection = () => (
  <section className="py-16 px-4 bg-white">
    <h2 className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-10">
      What Our Users Say
    </h2>
    <div className="flex flex-col md:flex-row gap-8 justify-center items-center max-w-5xl mx-auto">
      {testimonials.map((t, i) => (
        <div key={i} className="bg-green-50 rounded-xl p-8 shadow flex flex-col items-center text-center max-w-sm">
          {/* <img src={t.img} alt={t.name} className="w-20 h-20 rounded-full mb-4 object-cover" /> */}
          <Image
  src={t.img}
  alt={t.name}
  width={80}
  height={80}
  className="w-20 h-20 rounded-full mb-4 object-cover"
/>
          <p className="text-gray-700 italic mb-4">"{t.text}"</p>
          <span className="font-semibold text-green-800">{t.name}</span>
        </div>
      ))}
    </div>
  </section>
);

export default TestimonialsSection;