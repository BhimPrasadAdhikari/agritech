import { getServerSession } from "next-auth";
import Navbar from "./components/Navbar";
import { Metadata } from "next";
import { authOptions } from "../api/auth/authoptions";
interface SessionUserType {
  image: string | null;
  name: string | null;
  email: string | null;
  id: string;
  role: string;
  emailVerified: Date | null;
  hashedPassword: string | null;
  createdAt: Date;
  updatedAt: Date;
  conversationIds: string[];
  seenMessageIds: string[];
  notificationTokens: string[];
}

export const metadata: Metadata = {
  title: "Admin",
  description: "Admin Dashboard",
};
export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  const user = session?.user as SessionUserType;
  console.log(user)
  // Check if the session exists and if the user has the "admin" role
  if (!session || user.role !== "ADMIN") {
    // If not an admin, return an "Unauthorized" page
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-3xl font-bold text-red-600">Unauthorized</h1>
        <p className="text-lg text-gray-600">
          You do not have permission to access this page.
        </p>
      </div>
    );
  }
  return (
    <>
      <div>
        <Navbar />
      </div>
      {children}
    </>
  );}
