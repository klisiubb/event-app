"use client";
import React, { useState } from "react";
import { useFilter } from "@/lib/use-filter";
import CreateDialog from "../create-dialog";
import { QRCodeFormSchema } from "@/schemas/admin/qrcode";
import { CreateQRCode } from "@/actions/admin/qrcode/create";
import { QrCode } from "@prisma/client";
import QRCodeCard from "./qrcode-card";
import { BlurFade } from "@/components/ui/blur-fade";
import StatusFilter from "../filter-status";
import SearchInput from "../search-filter";

export const QRCodesView = ({ qrcodes }: { qrcodes: QrCode[] }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const filteredQRs = useFilter<QrCode>(qrcodes, searchTerm, ["name"]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const statusFilteredQRs = filteredQRs.filter((obj) => {
    if (filterStatus === "all") return true;
    if (filterStatus === "published") return obj.isPublished;
    if (filterStatus === "unpublished") return !obj.isPublished;
    return true;
  });
  return (
    <div className="min-h-[calc(100vh-160px)] p-6 md:p-10">
      <div className="flex justify-center mb-4">
        <SearchInput
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Search QRCodes by name..."
        />
      </div>
      <div className="mb-4 flex justify-center items-center gap-4 md:justify-start">
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
        <StatusFilter
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />
      </div>
      <BlurFade inView delay={0.1}>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mt-6">
          {statusFilteredQRs.length > 0 ? (
            statusFilteredQRs.map((qr) => (
              <QRCodeCard key={qr.id} qrcode={qr} />
            ))
          ) : (
            <div className="col-span-full grid place-items-center my-4 md:my-16">
              <h1 className="font-bold text-4xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-tr from-primary to-destructive">
                QRCodes not found!
              </h1>
              <p className="md:text-xl mt-4">
                Change your search term or create new QRCode.
              </p>
            </div>
          )}
        </div>
      </BlurFade>
    </div>
  );
};
