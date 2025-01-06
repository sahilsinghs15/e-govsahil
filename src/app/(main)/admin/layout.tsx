// app/layout.tsx


import Appbar from "@/components/Appbar";
import { Footer } from "@/components/Footer";
import { SessionProviderWrapper } from "@/components/SessionProviderWrapper";
import { Toaster } from "react-hot-toast";


export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full pt-4 pb-3">
      
      <SessionProviderWrapper>
        <Appbar />
        {children}
      </SessionProviderWrapper>
      <Footer />
      {/* Move Toaster inside the body */}
      <Toaster />
    </div>
  );

}