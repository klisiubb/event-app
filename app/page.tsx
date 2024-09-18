import { Button } from "@/components/ui/button";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import React from "react";

const Page = async () => {
  const { isAuthenticated, getPermission } = getKindeServerSession();
  const isAdmin = await getPermission("admin");
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold">Event App</h1>
      <p className="mt-2">More info soon.</p>
      {(await isAuthenticated()) ? (
        <>
          <Button className="my-4">
            <LogoutLink>Log out </LogoutLink>
          </Button>
          {isAdmin?.isGranted ? (
            <Button asChild variant="outline">
              <Link href="/admin/">Go to admin panel</Link>
            </Button>
          ) : (
            <> </>
          )}
        </>
      ) : (
        <Button className="my-4">
          <LoginLink>Log in please</LoginLink>
        </Button>
      )}
    </div>
  );
};

export default Page;
