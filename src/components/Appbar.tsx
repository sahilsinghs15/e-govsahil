"use client";

import { useSession } from "next-auth/react";
import StudentAppbar from "./StudentAppbar";
import AdminAppbar from "./AdminAppbar";


const Appbar = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>; 
  }

  if (!session) {
    return null;
  }

  
  return session.user.role === "Student" ? <StudentAppbar /> : <AdminAppbar />;
  // return <StudentAppbar />;
};

export default Appbar;