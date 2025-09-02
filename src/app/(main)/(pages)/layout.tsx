
import Appbar from "@/components/Appbar";
import { Footer } from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full ">
      <Appbar />
      {children}
      <Footer />
      <Toaster />
    </div>
  );

}