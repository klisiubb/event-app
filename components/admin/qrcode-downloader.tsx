"use client";
// @ts-ignore
import { triggerBase64Download } from "react-base64-downloader";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface Props {
  base64: string | null;
  name: string;
}

export const QRDownloader = ({ base64, name }: Props) => {
  return (
    <Button
      variant="outline"
      size="sm"
      className="w-fulL"
      disabled={!base64}
      onClick={() => triggerBase64Download(base64, name)}
    >
      <Download className="w-4 h-4 mr-2" />
      Download
    </Button>
  );
};
