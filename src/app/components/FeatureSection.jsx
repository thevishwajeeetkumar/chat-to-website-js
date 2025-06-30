export default function FeatureSection() {
  const features = [
    ["🧠 Semantic Search", "AI understands meaning, not just keywords."],
    ["⚡ Instant Summaries", "Quickly digest long articles or pages."],
    ["📝 Multi-format", "Supports HTML, PDF, and Markdown."],
    ["💬 Memory", "Keeps your chat context-aware."],
    ["🌐 Any Website", "Paste a URL — get instant interaction."],
    ["🔒 Secure", "Nothing stored without encryption and consent."],
  ];

  return (
    <div>
      <h3 className="text-2xl font-bold mb-8 text-center">Why RagChat?</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {features.map(([title, desc]) => (
          <div key={title} className="bg-gray-900/60 p-6 rounded-lg shadow-md border border-gray-800">
            <h4 className="text-lg font-semibold mb-2">{title}</h4>
            <p className="text-gray-400 text-sm">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
