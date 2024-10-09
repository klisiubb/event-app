"use client";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

import { Search } from "lucide-react";
import { useFilter } from "@/lib/use-filter";
import { WorkshopWithQRCode } from "@/types/workshop-qrcode.type";
import CreateDialog from "../create-dialog";

import { QRCodeFormSchema } from "@/schemas/admin/qrcode";
import { CreateQRCode } from "@/actions/admin/qrcode/create";
import { QrCode } from "@prisma/client";
import QRCodeCard from "./qrcode-card";

export const QRCodesView = ({ qrcodes }: { qrcodes: QrCode[] }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const filteredQRs = useFilter<QrCode>(qrcodes, searchTerm, ["name"]);
  if (!filteredQRs) {
    <></>;
  }
  return (
    <div className="min-h-[calc(100vh-160px)] p-6 md:p-10">
      <div className="flex justify-center mb-4">
        <div className="relative w-full max-w-xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search QRCodes by name..."
            className="pl-10 pr-4 py-2 w-full rounded-full"
          />
        </div>
      </div>
      <div className="mb-4 flex justify-center md:justify-start">
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
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {filteredQRs.map((qr) => (
          <QRCodeCard key={qr.id} qrcode={qr} />
        ))}
      </div>
    </div>
  );
};
