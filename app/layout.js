import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Flashcard app",
  description: "Help you study in half the time",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en" style={{scrollBehavior: "smooth"}} >
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
