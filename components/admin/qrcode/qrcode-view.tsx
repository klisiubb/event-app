import { Card, CardContent } from "@/components/ui/card";
import { QrCode } from "@prisma/client";
import { ImageIcon, PlusCircleIcon, UsersIcon } from "lucide-react";
import { QRDownloader } from "../qrcode-downloader";
import Image from "next/image";

export default function QRCodeView({ qrcode }: { qrcode: QrCode }) {
  return (
    <Card className="max-w-2xl mx-auto mt-8 shadow-lg">
      <CardContent className="p-6 space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-center text-primary">
            {qrcode.name}
          </h2>
        </div>
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
    </Card>
  );
}
