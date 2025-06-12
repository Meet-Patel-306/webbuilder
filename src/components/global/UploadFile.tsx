"use client";

import { UploadDropzone } from "@/utils/uploadthing";

type props = {
  apiendpoint: "agencyLogo" | "avatar" | "subaccountLogo";
  onChange?: (url?: string) => void;
  value?: string;
};
export default function UploadFile({ apiendpoint, onChange, value }: props) {
  const fileType = value?.split(".").pop();

  return (
    <div className="sm:w-full w-64 mx-auto bg-muted/90 rounded-b-md p-4">
      <UploadDropzone
        endpoint={apiendpoint}
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
}
