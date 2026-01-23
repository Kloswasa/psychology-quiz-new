type Destination = { name: string; reason: string };

export default function TravelerResult({
  title,
  description,
  imageUrl,
  destinations,
  tips,
  trivia,
}: {
  title: string;
  description: string;
  imageUrl?: string | null;
  destinations: Destination[];
  tips: string[];
  trivia: string[];
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt={title} className="h-20 w-20 rounded object-cover" />
        ) : null}
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>

      <section>
        <h2 className="mb-2 text-xl font-semibold">Suggested Destinations</h2>
        <ul className="list-inside list-disc space-y-1">
          {destinations.map((d, i) => (
            <li key={i}>
              <strong>{d.name}</strong>: {d.reason}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-2 text-xl font-semibold">Travel Tips</h2>
        <ul className="list-inside list-disc space-y-1">
          {tips.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-2 text-xl font-semibold">Travel Trivia</h2>
        <ul className="list-inside list-disc space-y-1">
          {trivia.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

