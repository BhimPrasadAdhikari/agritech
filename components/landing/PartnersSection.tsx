"use client";


const partners = [
  "/images/partner1.png",
  "/images/partner2.png",
  "/images/partner3.png",
  "/images/partner4.png",
];

const PartnersSection = () => (
  <section className="py-10 px-4 bg-green-50">
    <h2 className="text-2xl font-bold text-center text-green-900 mb-6">
      Trusted by Leading Organizations
    </h2>
    <div className="flex flex-wrap justify-center items-center gap-8">
      {partners.map((src, i) => (
        <img key={i} src={src} alt="Partner Logo" className="h-12 w-auto grayscale hover:grayscale-0 transition" />
      ))}
    </div>
  </section>
);

export default PartnersSection;