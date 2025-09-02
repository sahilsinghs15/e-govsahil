import { redirect } from "next/navigation";
import { getServerSession } from "next-auth"; // For next-auth users, adapt if you're using a custom auth logic

export default async function Page() {
  // Fetch the user's session (or adapt to your auth mechanism)
  const session = await getServerSession();

  // If the user is logged in, redirect to the home page
  if (session && !(session.user.role === "AdmissionAdmin")) {
    redirect("/home"); // Replace '/home' with your actual home route
  }

  if(session && (session.user.role === "AdmissionAdmin")) {
    redirect("/admin"); // Replace '/home' with your actual
  }
  // If the user is not logged in, redirect to the sign-in page
  redirect("/signin"); // Replace '/signin' with your actual sign-in route

  // This return is not reached due to the redirects above, but required for the component.
  return null;
}