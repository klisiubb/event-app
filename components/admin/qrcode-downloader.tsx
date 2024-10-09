"use client";
// @ts-ignore
import { triggerBase64Download } from "react-base64-downloader";
import { Button } from "@/components/ui/button";

interface Props {
  base64: string;
  name: string;
}

export const QRDownloader = ({ base64, name }: Props) => {
  return (
    <Button onClick={() => triggerBase64Download(base64, name)}>
      Download
    </Button>
  );
};
