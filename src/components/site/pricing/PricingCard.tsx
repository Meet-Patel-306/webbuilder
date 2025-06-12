"use client";

import { CircleCheck, CircleX } from "lucide-react";
import { Divider, List, ListItem } from "@tremor/react";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "For small teams",
    features: [
      {
        feature: "10 user seats",
        active: true,
      },
      {
        feature: "5 workspaces",
        active: true,
      },
      {
        feature: "Single Sign-On (SSO)",
        active: false,
      },
      {
        feature: "Two-factor authentication",
        active: false,
      },
      {
        feature: "Caching and pre-aggreation",
        active: false,
      },
    ],
    isEnterprise: false,
    isRecommended: false,
    buttonText: "Get started",
    buttonLink: "#",
  },
  {
    name: "Starter",
    price: "$50",
    description: "For growing teams",
    features: [
      {
        feature: "50 user seats",
        active: true,
      },
      {
        feature: "25 workspaces",
        active: true,
      },
      {
        feature: "Single Sign-On (SSO)",
        active: false,
      },
      {
        feature: "Two-factor authentication",
        active: false,
      },
      {
        feature: "Caching and pre-aggreation",
        active: false,
      },
    ],
    isEnterprise: false,
    isRecommended: true,
    buttonText: "Get started",
    buttonLink: "#",
  },
  {
    name: "Enterprise",
    price: "$190",
    description: "For custom needs",
    features: [
      {
        feature: "Unlimited user seats",
        active: true,
      },
      {
        feature: "Unlimited workspaces",
        active: true,
      },
      {
        feature: "Single Sign-On (SSO)",
        active: true,
      },
      {
        feature: "Two-factor authentication",
        active: true,
      },
      {
        feature: "Caching and pre-aggreation",
        active: true,
      },
    ],
    isEnterprise: true,
    isRecommended: false,
    buttonText: "Contact sales",
    buttonLink: "#",
  },
];

export default function PricingCard() {
  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-72">
        {plans.map((plan, planIdx) => (
          <div
            key={planIdx}
            className="relative rounded-tremor-default border border-tremor-border  bg-white/80 dark:bg-black/30 p-6 dark:border-gray-700 rounded-2xl mb-24"
          >
            {plan.isRecommended ? (
              <div className="flex justify-center bg-blue-700">
                <span className="absolute top-0 -translate-y-1/2 rounded-lg bg-blue-700 px-3 py-1  font-medium tracking-wide ">
                  recommended
                </span>
              </div>
            ) : null}
            <h3 className="text-tremor-default font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
              {plan.name}
            </h3>
            <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
              {plan.description}
            </p>
            <p className="mt-6 flex items-baseline">
              <span className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                {plan.price}
              </span>
              <span className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                /mo
              </span>
            </p>
            <Divider />
            <List className="mt-4 divide-y-0 text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis">
              {plan.features.map((feature, featureIdx) => (
                <ListItem
                  key={featureIdx}
                  className="justify-start space-x-2 py-2.5"
                >
                  {feature.active ? (
                    <CircleCheck
                      className="size-5 shrink-0 text-blue-700"
                      aria-hidden={true}
                    />
                  ) : (
                    <CircleX
                      className="size-5 shrink-0 text-tremor-content-subtle dark:text-tremor-content-subtle"
                      aria-hidden={true}
                    />
                  )}
                  <span>{feature.feature}</span>
                </ListItem>
              ))}
            </List>
            {plan.isEnterprise ? (
              <a
                href={plan.buttonLink}
                className="mt-8 inline-flex h-10 w-full items-center justify-center whitespace-nowrap rounded-tremor-small border border-tremor-border bg-tremor-background text-tremor-default font-medium text-tremor-content-emphasis shadow-tremor-input hover:text-tremor-content-strong dark:border-dark-tremor-border dark:bg-dark-tremor-background dark:text-dark-tremor-content-emphasis dark:shadow-dark-tremor-input hover:dark:bg-dark-tremor-background-subtle hover:dark:text-dark-tremor-content-strong"
              >
                {plan.buttonText}
              </a>
            ) : (
              <a
                href={plan.buttonLink}
                className="mt-8 inline-flex h-10 w-full items-center justify-center whitespace-nowrap rounded-tremor-small bg-tremor-brand text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis"
              >
                {plan.buttonText}
              </a>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
