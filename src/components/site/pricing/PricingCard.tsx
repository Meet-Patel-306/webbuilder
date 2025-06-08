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

const plans = [
  {
    name: "Free",
    price: "Free",
    description: "Forever free plan for individuals",
    features: ["1 user", "Plan features", "Product support"],
    isPopular: false,
  },
  {
    name: "Startup",
    price: "£39",
    description: "All the basics for starting a new business",
    features: ["2 users", "Plan features", "Product support"],
    isPopular: true,
  },
  {
    name: "Team",
    price: "£89",
    description: "Everything you need for a growing business",
    features: ["5 users", "Plan features", "Product support"],
    isPopular: false,
  },
];

export default function PricingCard() {
  return (
    <section className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px] py-24 lg:py-32">
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan, idx) => (
          <Card
            key={idx}
            className={`relative flex flex-col border border-border/30 backdrop-blur-md bg-white/80 dark:bg-black/30 shadow-xl transition-transform hover:-translate-y-1 hover:shadow-2xl ${
              plan.isPopular ? "ring-2 ring-indigo-500 scale-105" : ""
            }`}
          >
            <CardHeader className="text-center">
              {plan.isPopular && (
                <Badge className="absolute top-4 left-4 uppercase bg-indigo-600 text-white">
                  Most Popular
                </Badge>
              )}
              <CardTitle className="mb-4 text-2xl font-semibold tracking-tight">
                {plan.name}
              </CardTitle>
              <div className="text-5xl font-bold">{plan.price}</div>
            </CardHeader>
            <CardDescription className="text-center px-6">
              {plan.description}
            </CardDescription>
            <CardContent className="flex-1 px-6">
              <ul className="mt-8 space-y-3 text-sm">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-muted-foreground"
                  >
                    <CheckIcon className="h-4 w-4 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="px-6 pb-6">
              <Button
                className={`w-full ${
                  plan.isPopular
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : ""
                }`}
              >
                Sign up
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
