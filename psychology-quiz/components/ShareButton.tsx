'use client';

export default function ShareButton({ url, title }: { url: string; title: string }) {
  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // ignore
      }
    } else {
      await navigator.clipboard.writeText(url);
      alert('Link copied to clipboard');
    }
  };
  return (
    <button
      onClick={share}
      className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      type="button"
    >
      Share
    </button>
  );
}

