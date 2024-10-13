"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DeleteDialog from "../delete-dialog";
import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";
import { Edit, ImageIcon, PlusCircleIcon, UsersIcon } from "lucide-react";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { QRDownloader } from "../qrcode-downloader";
import { QrCode } from "@prisma/client";
import { DeleteQRCode } from "@/actions/admin/qrcode/delete";

export default function QRCodeCard({ qrcode }: { qrcode: QrCode }) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold text-primary line-clamp-2 flex-grow pr-2">
            {qrcode.name}
          </CardTitle>
          <Badge variant={qrcode.isPublished ? "default" : "destructive"}>
            {qrcode.isPublished ? "Published" : "Not Published"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-4 pb-4">
        <div className="flex justify-between">
          <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <PlusCircleIcon className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">
                {qrcode.value
                  ? `Value: ${qrcode.value} points`
                  : "Value not yet set"}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <UsersIcon className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">
                {qrcode.maxUses
                  ? `Max uses: ${qrcode.maxUses} scans`
                  : "Max uses  not yet set"}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <div className="w-24 h-24 bg-muted rounded-md flex items-center justify-center">
              {qrcode.base64 ? (
                <Image
                  src={qrcode.base64}
                  alt="QR Code"
                  width={96}
                  height={96}
                  className="rounded-md"
                />
              ) : (
                <ImageIcon className="w-8 h-8 text-muted-foreground" />
              )}
            </div>
            <QRDownloader base64={qrcode.base64} name={qrcode.name} />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 pt-4 border-t">
        <Button asChild variant="outline" className="flex-1">
          <Link
            href={`/admin/qrcode/edit/${qrcode.id}`}
            className="flex items-center justify-center gap-2"
          >
            <Edit className="h-4 w-4" />
            Edit
          </Link>
        </Button>
        <DeleteDialog
          route="qrcode"
          id={qrcode.id}
          buttonText="Delete"
          text="this QRCode"
          deleteAction={DeleteQRCode}
        />
      </CardFooter>
    </Card>
  );
}
