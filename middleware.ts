import { withAuth } from "next-auth/middleware"

export default withAuth({
  // Matches the pages config in `[...nextauth]`
  pages: {
    signIn: "/signin",
  },
})

export const config = {
    matcher:["/experts/:path*","/crops/:path*","/diseases/:path*","/chats/:path*","/admin/:path*","/field/:path*"]
}