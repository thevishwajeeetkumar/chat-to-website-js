export default function PricingSection({ id = "pricing" }) {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      desc: "100 queries / month • 1 URL history",
      cta: "Get Started",
      highlight: false,
    },
    {
      name: "Pro",
      price: "$19",
      desc: "3 000 queries • Unlimited URLs • PDF upload",
      cta: "Upgrade",
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "Contact",
      desc: "Custom limits • Team dashboard • SLA & SSO",
      cta: "Contact Sales",
      highlight: false,
    },
  ];

  return (
    <section id={id} className="py-24 px-6">
      <h3 className="text-center text-3xl font-bold mb-14">Pricing</h3>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`rounded-xl p-8 border border-white/10 bg-white/5 backdrop-blur-sm ${
              p.highlight ? "ring-2 ring-accent" : ""
            }`}
          >
            <h4 className="text-xl font-semibold mb-2">{p.name}</h4>
            <div className="text-3xl font-extrabold mb-4">
              {p.price}
              {p.price !== "Free" && <span className="text-base font-normal">/mo</span>}
            </div>
            <p className="text-gray-300 mb-6">{p.desc}</p>
            <button className="w-full py-2 rounded-md bg-primary text-black font-semibold hover:bg-accent transition">
              {p.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
