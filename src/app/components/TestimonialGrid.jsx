export default function TestimonialGrid() {
  const quotes = [
    ["“We replaced hours of manual reading with seconds of RagChat.”", "Alex Stone, CTO"],
    ["“Our support team deflects 40 % of tickets with embedded chat.”", "Maria Nguyen, CSM"],
    ["“Best AI doc assistant we’ve tested — blazing fast.”", "Leo Silva, Tech Writer"],
  ];
  return (
    <section className="py-24 px-6">
      <h3 className="text-center text-3xl font-bold mb-14">Loved by Teams</h3>

      <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-3">
        {quotes.map(([text, author]) => (
          <figure key={author} className="bg-white/5 p-6 rounded-lg border border-white/10">
            <blockquote className="text-gray-200 italic text-sm leading-relaxed mb-4">{text}</blockquote>
            <figcaption className="text-xs text-gray-400">{author}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
