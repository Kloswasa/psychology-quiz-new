'use client';

export default function ShareButton({ url, title }: { url: string; title: string }) {
  const share = async () => {
    const fullUrl =
      typeof window !== 'undefined' && url.startsWith('/')
        ? `${window.location.origin}${url}`
        : url;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url: fullUrl,
          text: title,
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          await navigator.clipboard.writeText(fullUrl);
          alert('Link copied to clipboard');
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(fullUrl);
        alert('Link copied to clipboard');
      } catch {
        alert('Could not copy link');
      }
    }
  };

  return (
    <button onClick={share} className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700" type="button">
      Share
    </button>
  );
}

