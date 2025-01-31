import type { Metadata } from "next";
import { Libre_Franklin } from "next/font/google";
import "./globals.css";
import { GameProvider } from '@/context/GameProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const libreFranklin = Libre_Franklin({
  subsets: ['latin'], // Add additional subsets if needed
  weight: ['400', '500', '700'], // Define the weights you need
  variable: '--font-libre-franklin', // Use CSS variable for Tailwind
  display: 'swap',
});

export const metadata: Metadata = {
  title: " Ispeling Bee",
  description: "NYT Spelling Bee game with Filipino words!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${libreFranklin.variable}`}>
        <GameProvider>
          {children}
          <ToastContainer position="top-center" autoClose={2000} />
        </GameProvider>
      </body>
    </html>
  );
}
