// app/layout.tsx

import { Appbar } from "@/components/Appbar";
import { Footer } from "@/components/Footer";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "E-Governance",
  description: "Description of your app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-full pt-4 pb-3">
          <Appbar />
        </div>
        {children}
        <Footer />
      </body>
      <Toaster/>
    </html>
  );
}
