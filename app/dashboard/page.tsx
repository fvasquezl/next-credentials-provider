"use client";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
const DashboardPage = () => {
  const [newName, setNewName] = useState("");
  const { data: session, status, update } = useSession();
  console.log("useSession hook session object", session);

  return (
    <div className="text-center text-4xl font-bold">
      <h1>Dashboard</h1>
      <p>Hi {session?.user?.name}</p>
      <label>Update Name</label>
      <input
        type="text"
        placeholder="enter new name"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <button
        onClick={() => update({ name: newName })}
        className="bg-red-500 text-sm text-white p-3 rounded-full"
      >
        Update
      </button>
      <button
        onClick={() => signOut()}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default DashboardPage;
