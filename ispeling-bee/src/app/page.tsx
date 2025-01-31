import Image from "next/image";
import '@/styles/globals.css';
import ShowMessageText from '@/components/ShowMessageText';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Spelling Bee!</h1>
        <ShowMessageText />
    </main>
  );
}
