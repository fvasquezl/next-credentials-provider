"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
const DashboardPage = () => {
  const [newData, setNewData] = useState("");
  const { data: session, status, update } = useSession();
  console.log("useSession hook session object", session);

  return (
    <div className="text-center text-4xl font-bold">
      <h1>Dashboard</h1>
      <p>Hi {session?.user?.name}</p>
      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        Logout
      </button>
    </div>
  );
};

export default DashboardPage;
