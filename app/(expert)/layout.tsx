import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ExpertNavbar from "./components/ExpertNavbar";
export default async function ExpertLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  console.log(user)
  // Check if the session exists and if the user has the "admin" role
  if (!session || user?.role !== "EXPERT") {
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
  return  <>
      <div>
        <ExpertNavbar />
      </div>
      {children}
    </>
}
