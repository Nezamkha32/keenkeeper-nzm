import { Toaster } from 'react-hot-toast'; 
import Navbar from '@/components/Navbar';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TimelineProvider from "@/context/TimelineContext";
import { EntriesProvider } from '@/context/EntriesContext';
import Footer from '@/components/Footer';




const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata = { 
  title: 'KeenKeeper - Keep Your Friendships Alive', description: 'Track and maintain meaningful connections with your friends', };

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >


      <body className="min-h-full flex flex-col ">
       <Toaster/>
       <Navbar /> 
       <main className="min-h-screen pt-20 pb-20"> {children} 
        </main> 
        <Footer /> 
        <TimelineProvider/>
        <Toaster position="top-right" />
        </body>
    </html>
  );
}
