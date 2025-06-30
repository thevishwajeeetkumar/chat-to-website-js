export default function FAQSection({ id = "faq" }) {
  const faqs = [
    ["How is my data stored?", "All crawled data is encrypted at rest in Upstash Redis."],
    ["What sites are supported?", "Any publicly reachable URL. PDFs & Markdown supported on Pro."],
    ["Can I embed the chat on my site?", "Yes! Grab a one-line script in the dashboard."],
  ];

  return (
    <section id={id} className="py-24 bg-white/5 px-6">
      <h3 className="text-center text-3xl font-bold mb-14">Frequently Asked Questions</h3>

      <div className="max-w-3xl mx-auto space-y-8">
        {faqs.map(([q, a]) => (
          <details key={q} className="bg-white/5 border border-white/10 rounded-lg p-4">
            <summary className="cursor-pointer font-semibold text-primary">{q}</summary>
            <p className="mt-2 text-gray-300">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
