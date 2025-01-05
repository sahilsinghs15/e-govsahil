// app/layout.tsx

import { Appbar } from "@/components/Appbar";
import { Footer } from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "E-Governance",
  description: "Description of your app",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="w-full pt-4 pb-3">
          <Appbar />
        </div>
        {children}
        <Footer />
      <Toaster/>
    </>
  );
}
