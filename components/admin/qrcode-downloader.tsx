"use client";

import { Button } from "@/components/ui/button";
import { handleDownload } from "@/lib/base64downloader";
import { Download } from "lucide-react";

interface Props {
  base64: string | null;
  name: string;
}

export const QRDownloader = ({ base64, name }: Props) => {
  if (!base64) {
    return <></>;
  }
  return (
    <Button
      variant="outline"
      size="sm"
      className="w-full"
      onClick={() => handleDownload({ base64, name })}
    >
      <Download className="w-4 h-4 mr-2" />
      Download
    </Button>
  );
};
