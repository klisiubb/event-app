import { withAuth } from "@kinde-oss/kinde-auth-nextjs/server";

export default withAuth(async function middleware(req: any) {}, {
  isReturnToCurrentPage: true,
  loginPage: "/api/auth/login",
  isAuthorized: ({ token }: any) => {
    return token.permissions.includes("admin");
  },
});

export const config = {
  matcher: ["/admin/:path*"],
};
