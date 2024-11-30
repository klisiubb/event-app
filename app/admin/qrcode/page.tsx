"use client";
import CreateDialog from "@/components/admin/create-dialog";
import { Button } from "@/components/ui/button";
import { List } from "lucide-react";
import { Link } from "next-view-transitions";
import React from "react";
import { QRCodeFormSchema } from "@/schemas/admin/qrcode";
import { CreateQRCode } from "@/actions/admin/qrcode/create";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { redirect } from "next/navigation";

const Page = () => {
  const { getAccessToken, isLoading } = useKindeBrowserClient();

  const token = getAccessToken();
  const isAdmin = token?.roles?.some((role) => role.key === "admin");

  if (isLoading || token === null || isAdmin === undefined) {
    <>Loading...</>;
  }
  if (isAdmin === false) {
    redirect("/dashboard");
  }
  return (
    <div className="min-h-[calc(100vh-160px)] p-6 md:p-10 flex flex-col justify-center items-center relative overflow-hidden">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        )}
      />
      <div className="max-w-4xl w-full space-y-8">
        <h1 className="pb-2 text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-tr from-primary to-destructive">
          QRCode Management Panel
        </h1>

        <p className="text-xl text-center text-muted-foreground">
          Welcome to the QRCode Management Panel. Here you can create new
          workshops or manage existing ones.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <CreateDialog
            buttonText="Add new QRCode"
            titleText="Add new QRCode"
            underTitleText="Setup QRCode name. You'll fill the rest later."
            formSchema={QRCodeFormSchema.pick({ name: true })}
            fieldName="name"
            route="qrcode"
            createAction={CreateQRCode}
            labelText="QRCode name:"
            descriptionText="You can change it later."
            placeholderText="e.g. 'QR for Sponsor 1'"
          />
          <Button
            asChild
            variant="outline"
            className="flex items-center gap-2  hover:font-bold z-10"
            size="lg"
          >
            <Link href="/admin/qrcode/view">
              <List className="w-5 h-5" />
              Manage QRCodes
            </Link>
          </Button>
        </div>

        <p className="text-sm text-center text-muted-foreground">
          Use the buttons above to start creating or managing your QRCodes.
        </p>
      </div>
    </div>
  );
};

export default Page;
