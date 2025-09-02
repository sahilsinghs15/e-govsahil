// import Signup from "@/components/auth/Signup";
// import { authOptions } from "@/lib/auth";
// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";

import Signup from "@/components/auth/Signup";
import  {
  authOptions,
} from "@/lib/auth";
import {
  getServerSession,
} from "next-auth";
import {
  redirect,
} from "next/navigation";

const SignupPage = async() => {
  const session = await getServerSession(authOptions);
  if(session?.user){
    redirect("/home");
  }
  return <>
    <Signup />
  </>
}


export default SignupPage;
