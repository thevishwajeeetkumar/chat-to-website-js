export default function HowItWorks({ id = "how" }) {
  const steps = [
    ["1 · Paste URL",   "Drop any public link into the app."],
    ["2 · AI Ingests",  "RagChat crawls, chunks & embeds the content."],
    ["3 · Start Chat",  "Ask questions, get instant, context-aware answers."],
  ];

  return (
    <section id={id} className="py-24 bg-white/5">
      <h3 className="text-center text-3xl font-bold mb-14">How it Works</h3>

      <div className="max-w-4xl mx-auto flex flex-col gap-12 md:flex-row md:justify-between">
        {steps.map(([title, sub]) => (
          <div key={title} className="flex-1 text-center md:px-4">
            <div className="text-2xl font-extrabold text-primary mb-4">{title}</div>
            <p className="text-gray-300">{sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
