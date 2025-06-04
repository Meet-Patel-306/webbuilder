"use client";

import PricingCard from "./pricing/PricingCard";
import Navbar from "./navbar/Navbar";

export default function LandingPage() {
  return (
    <>
      <section className="h-full w-full pt-36 relative flex items-center justify-center flex-col ">
        <Navbar />
        <div className="fixed inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] dark:hidden" />
        <div className="fixed inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] dark:block hidden " />
        <div className="flex flex-col justify-center items-center font-bold text-4xl md:text-6xl">
          <h1>Just Build it</h1>
          <h1>
            with{" "}
            <span className="bg-gradient-to-r from-indigo-600 from- via-violet-600 via- to-blue-500 to- text-transparent bg-clip-text">
              WebBuiler
            </span>
          </h1>
        </div>
        <div className="flex justify-center items-center">
          <img
            src="/img-loading-page.png"
            className="w-10/12 h-10/12 md:h-1/2 md:w-1/2 object-cover z-0 rounded-tl-2xl rounded-tr-2xl"
            alt="Background"
          />
        </div>
        <PricingCard />
      </section>
    </>
  );
}
