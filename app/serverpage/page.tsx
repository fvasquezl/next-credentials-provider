import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const page = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Hi {session?.user?.name}</p>
    </div>
  );
};

export default page;
