import { saveAs } from "file-saver";

interface DownloadParams {
  base64: string;
  name: string;
}

export const handleDownload = ({ base64, name }: DownloadParams) => {
  const contentTypes = {
    png: "image/png",
    jpeg: "image/jpeg",
    jpg: "image/jpg",
  };

  const base64Prepends = {
    png: `data:${contentTypes.png};base64,`,
    jpeg: `data:${contentTypes.jpeg};base64,`,
    jpg: `data:${contentTypes.jpg};base64,`,
  };

  const getExtFromBase64 = (base64: string) => {
    const ext = (
      Object.keys(base64Prepends) as Array<keyof typeof contentTypes>
    ).find((key) => base64.startsWith(base64Prepends[key]));
    if (!ext) {
      throw new Error(
        `Invalid base64 string extension. Expected one of: ${Object.keys(
          contentTypes
        ).join(", ")}`
      );
    }
    return ext;
  };

  const ext = getExtFromBase64(base64);
  const cleanedBase64 = base64.replace(base64Prepends[ext], "");
  const blob = base64ToBlob(cleanedBase64, contentTypes[ext]);

  saveAs(blob, `${name}.${ext}`);
};

const base64ToBlob = (base64: string, contentType: string): Blob => {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: contentType });
};
