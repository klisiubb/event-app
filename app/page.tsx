import { Button } from "@/components/ui/button";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";

const Page = async () => {
  const { isAuthenticated } = getKindeServerSession();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold">Event App</h1>
      <p className="text-muted mt-2">More info soon.</p>
      {(await isAuthenticated()) ? (
        <>
          <Button className="my-4">
            <LogoutLink>Log out </LogoutLink>
          </Button>
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
