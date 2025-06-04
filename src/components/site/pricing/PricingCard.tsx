"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckIcon } from "lucide-react";
import React from "react";

interface PlanFeature {
  type: string;
  features: {
    name: string;
    free: boolean;
    startup: boolean;
    team: boolean;
    enterprise: boolean;
  }[];
}

export default function PricingCard() {
  return (
    <>
      {/* Pricing */}
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px] py-24 lg:py-32">
        {/* End Switch */}
        {/* Grid */}
        <div className="mt-12 grid lg:grid-cols-3 gap-6 lg:items-center">
          {/* Card */}
          <Card className="flex flex-col  bg-white [background:radial-gradient(125%_125%_at_50%_100%,#fff_0%,#63e_100%)] dark:[background:radial-gradient(125%_125%_at_50%_100%,#000_0%,#63e_100%)]">
            <CardHeader className="text-center pb-2">
              <CardTitle className="mb-7">Free</CardTitle>
              <span className="font-bold text-5xl">Free</span>
            </CardHeader>
            <CardDescription className="text-center">
              Forever free
            </CardDescription>
            <CardContent className="flex-1">
              <ul className="mt-7 space-y-2.5 text-sm">
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">1 user</span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">Plan features</span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">Product support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Sign up</Button>
            </CardFooter>
          </Card>
          {/* End Card */}
          {/* Card */}
          <Card className="border-gray-700 border-2 flex flex-col bg-white [background:radial-gradient(125%_125%_at_50%_100%,#fff_0%,#63e_100%)] dark:[background:radial-gradient(125%_125%_at_50%_100%,#000_0%,#63e_100%)]">
            <CardHeader className="text-center pb-2">
              <Badge className="uppercase w-max self-center mb-3">
                Most popular
              </Badge>
              <CardTitle className="mb-7">Startup</CardTitle>
              <span className="font-bold text-5xl">£39</span>
            </CardHeader>
            <CardDescription className="text-center w-11/12 mx-auto">
              All the basics for starting a new business
            </CardDescription>
            <CardContent className="flex-1">
              <ul className="mt-7 space-y-2.5 text-sm">
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">2 user</span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">Plan features</span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">Product support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Sign up</Button>
            </CardFooter>
          </Card>
          {/* End Card */}
          {/* Card */}
          <Card className="flex flex-col bg-white [background:radial-gradient(125%_125%_at_50%_100%,#fff_0%,#63e_100%)] dark:[background:radial-gradient(125%_125%_at_50%_100%,#000_0%,#63e_100%)]">
            <CardHeader className="text-center pb-2">
              <CardTitle className="mb-7">Team</CardTitle>
              <span className="font-bold text-5xl">£89</span>
            </CardHeader>
            <CardDescription className="text-center  w-11/12 mx-auto">
              Everything you need for a growing business
            </CardDescription>
            <CardContent className="flex-1">
              <ul className="mt-7 space-y-2.5 text-sm">
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">5 user</span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">Plan features</span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">Product support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Sign up</Button>
            </CardFooter>
          </Card>
          {/* End Card */}
          {/* Card */}
          {/* <Card className="flex flex-col">
            <CardHeader className="text-center pb-2">
              <CardTitle className="mb-7">Enterprise</CardTitle>
              <span className="font-bold text-5xl">149</span>
            </CardHeader>
            <CardDescription className="text-center  w-11/12 mx-auto">
              Advanced features for scaling your business
            </CardDescription>
            <CardContent>
              <ul className="mt-7 space-y-2.5 text-sm">
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">10 user</span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">Plan features</span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">Product support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={"outline"}>
                Sign up
              </Button>
            </CardFooter>
          </Card> */}
          {/* End Card */}
        </div>
        {/* End Grid */}
        {/* Comparison table */}
      </div>
      {/* End Pricing */}
    </>
  );
}
