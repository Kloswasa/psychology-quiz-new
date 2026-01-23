import Link from 'next/link';

export default function IntroPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-2xl font-bold">How it works</h1>
      <p className="mt-3 text-gray-700">
        Answer 10 questions. Each question has 4–5 answers. Selecting an answer will
        automatically move to the next question. You can go back to change answers at any time.
      </p>
      <ul className="mt-4 list-inside list-disc text-gray-700">
        <li>No sign-in required</li>
        <li>Takes about 2–3 minutes</li>
        <li>Instant result with tailored travel content</li>
      </ul>
      <div className="mt-8">
        <Link
          href="/quiz"
          className="inline-block rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Begin
        </Link>
      </div>
    </div>
  );
}

