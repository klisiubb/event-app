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
import { Edit, ImageIcon, MapPinIcon } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { DeleteSponsor } from "@/actions/admin/sponsor/delete";
import { SponsorWithQRCode } from "@/types/sponsor-types";
import { QRDownloader } from "../qrcode-downloader";

export default function sponsorCard({
  sponsor,
}: {
  sponsor: SponsorWithQRCode;
}) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold text-primary line-clamp-2 flex-grow pr-2">
            {sponsor.name}
          </CardTitle>
          <Badge variant={sponsor.isPublished ? "default" : "destructive"}>
            {sponsor.isPublished ? "Published" : "Not Published"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-4 pb-4">
        <div className="relative w-full aspect-video overflow-hidden rounded-md">
          {sponsor.imageUrl ? (
            <Image
              src={sponsor.imageUrl}
              alt={sponsor.name}
              className="transition-transform duration-300 hover:scale-105 object-contain"
              fill
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <ImageIcon className="w-12 h-12 text-muted-foreground" />
              <span className="sr-only">Image not yet set</span>
            </div>
          )}
        </div>

        <div className="min-h-[4.5rem]">
          <p className="text-sm text-muted-foreground line-clamp-3 max-w-[300px] text-center">
            {sponsor.description || "Description not yet set"}
          </p>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <MapPinIcon className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">
                {sponsor.websiteUrl ? (
                  <Link href={sponsor.websiteUrl}>Sponsor website</Link>
                ) : (
                  "Website not yet set"
                )}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <div className="w-24 h-24 bg-muted rounded-md flex items-center justify-center">
              {sponsor.qrCode!.base64 ? (
                <Image
                  src={sponsor.qrCode!.base64}
                  alt="QR Code"
                  width={96}
                  height={96}
                  className="rounded-md"
                />
              ) : (
                <ImageIcon className="w-8 h-8 text-muted-foreground" />
              )}
            </div>
            <QRDownloader base64={sponsor.qrCode!.base64} name={sponsor.name} />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 pt-4 border-t">
        <Button asChild variant="outline" className="flex-1">
          <Link
            href={`/admin/sponsor/edit/${sponsor.id}`}
            className="flex items-center justify-center gap-2"
          >
            <Edit className="h-4 w-4" />
            Edit
          </Link>
        </Button>
        <DeleteDialog
          route="sponsor"
          id={sponsor.id}
          buttonText="Delete"
          text="this sponsor"
          deleteAction={DeleteSponsor}
        />
      </CardFooter>
    </Card>
  );
}
