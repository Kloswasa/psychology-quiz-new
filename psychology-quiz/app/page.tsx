import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-sky-50">
      <main className="mx-auto w-full max-w-3xl px-6 py-20">
        <div className="rounded-xl bg-white p-10 shadow-md">
          <h1 className="text-3xl font-bold">Discover Your Travel Personality</h1>
          <p className="mt-3 text-gray-600">
            Take a quick 10-question quiz to find your traveler type and get personalized
            destinations, tips, and trivia.
          </p>
          <div className="mt-6">
            <Link
              href="/intro"
              className="inline-block rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
            >
              Start Quiz
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
