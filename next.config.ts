import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      /**
       *  Allow _any_ sub-domain on ufs.sh that serves files
       *  from your UploadThing project, and the legacy utfs.io
       */
      {
        protocol: "https",
        // “**” = any number of sub-domains
        hostname: "**.ufs.sh",
        pathname: "/f/*", // only the /f/* path UploadThing uses
      },
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: "/f/*",
      },
    ],
  },
};

export default nextConfig;
