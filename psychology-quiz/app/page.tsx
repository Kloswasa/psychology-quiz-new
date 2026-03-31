import { HomePage } from '@/components/HomePage';

export default function Home() {
  return (
    <div className="min-h-[100dvh] w-full bg-neutral-200 flex justify-center">
      <div className="h-[100dvh] max-w-[430px] w-full overflow-hidden relative flex flex-col">
        <HomePage />
      </div>
    </div>
  );
}