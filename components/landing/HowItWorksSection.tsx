"use client";


const steps = [
  {
    title: "Sign Up",
    desc: "Create your free account as a farmer, expert, or agri-business.",
  },
  {
    title: "Connect & Consult",
    desc: "Ask questions, book appointments, and chat with agriculture experts.",
  },
  {
    title: "Monitor & Grow",
    desc: "Use smart tools to monitor your fields and boost productivity.",
  },
  {
    title: "Shop & Sell",
    desc: "Buy quality products or sell your harvest in our secure marketplace.",
  },
];

const HowItWorksSection = () => (
  <section className="py-16 px-4 bg-gradient-to-r from-green-50 to-green-100">
    <h2 className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-10">
      How It Works
    </h2>
    <div className="flex flex-col md:flex-row justify-center items-center gap-8 max-w-5xl mx-auto">
      {steps.map((step, i) => (
        <div key={i} className="flex flex-col items-center text-center max-w-xs">
          <div className="bg-green-600 text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">
            {i + 1}
          </div>
          <h3 className="text-xl font-semibold text-green-800">{step.title}</h3>
          <p className="mt-2 text-gray-600">{step.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default HowItWorksSection;