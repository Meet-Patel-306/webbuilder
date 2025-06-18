"use client";

import { UploadDropzone } from "@/utils/uploadthing";
import { FileIcon, X } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";

type props = {
  apiendpoint: "agencyLogo" | "avatar" | "subaccountLogo";
  onChange: (url?: string) => void;
  value?: string;
};
export default function UploadFile({ apiendpoint, onChange, value }: props) {
  const fileType = value?.split(".").pop();

  if (fileType) {
    return (
      <div className="flex justify-center mt-2 ">
        {fileType !== "pdf" ? (
          <div className="relative size-40">
            <img
              src={value as string}
              alt="uploaded image"
              loading="lazy"
              className="object-contain mt-5"
            />
          </div>
        ) : (
          <div>
            <FileIcon />
            <a
              href={value}
              target="_blank"
              rel="noopener_noreferrer"
              className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
            >
              View PDF
            </a>
          </div>
        )}
        <Button
          onClick={() => onChange("")}
          className="bg-transparent hover:bg-transparent"
        >
          <X className="text-black dark:text-white m-0 p-0" />
        </Button>
      </div>
    );
  }

  return (
    <div className="sm:w-full w-64 mx-auto bg-muted/90 rounded-b-md p-4">
      <UploadDropzone
        endpoint={apiendpoint}
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          onChange(res[0]?.ufsUrl);
          toast.success("Agency Logo upload successfully...");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          console.log(error?.message);
          toast.error("Failed to upload agency logo...");
        }}
      />
    </div>
  );
}
