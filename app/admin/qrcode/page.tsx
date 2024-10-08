"use client";
import CreateDialog from "@/components/admin/create-dialog";
import { Button } from "@/components/ui/button";
import { List } from "lucide-react";
import Link from "next/link";
import React from "react";
import { QRCodeFormSchema } from "@/schemas/admin/qrcode";
import { CreateQRCode } from "@/actions/admin/qrcode/create";

const Page = () => {
  return (
    <div className="min-h-[calc(100vh-160px)] p-6 md:p-10 flex flex-col justify-center items-center">
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
            className="flex items-center gap-2  hover:font-bold"
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
