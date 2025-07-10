"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { v4 } from "uuid";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { toast } from "sonner";

import UploadFile from "../global/UploadFile";
import { Agency, SubAccount } from "@/generated/prisma";
import { saveActivityLogAsNotification, upsertSubAccount } from "@/lib/queries";
import { useEffect } from "react";
import { useModel } from "@/provider/model-provider";
// import Loading from "../global/Loading";

const formSchema = z.object({
  name: z.string(),
  agencyEmail: z.string(),
  agencyPhone: z.string().min(1),
  address: z.string(),
  city: z.string(),
  subAccountLogo: z.string(),
  zipcode: z.string(),
  state: z.string(),
  country: z.string(),
});
type props = {
  //To add the sub account to the agency
  agencyDetails: Agency;
  details: Partial<SubAccount>;
  userId: string;
  userName: string;
};

export default function SubAccountDetails({
  details,
  agencyDetails,
  userId,
  userName,
}: props) {
  const { setClose } = useModel();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: details?.name,
      agencyEmail: details?.agencyEmail,
      agencyPhone: details?.agencyPhone,
      address: details?.address,
      city: details?.city,
      zipcode: details?.zipcode,
      state: details?.state,
      country: details?.country,
      subAccountLogo: details?.subAccountLogo,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await upsertSubAccount({
        id: details?.id ? details.id : v4(),
        address: values.address,
        subAccountLogo: values.subAccountLogo,
        city: values.city,
        agencyEmail: values.agencyEmail,
        agencyPhone: values.agencyPhone,
        name: values.name,
        state: values.state,
        zipcode: values.zipcode,
        createdAt: new Date(),
        updatedAt: new Date(),
        agencyId: agencyDetails.id,
        connectAccountId: "",
        goal: 5000,
      });
      if (!response) throw new Error("No response from server");
      await saveActivityLogAsNotification({
        agencyId: response.agencyId,
        description: `${userName} | updated sub account | ${response.name}`,
        subaccountId: response.id,
      });

      //   toast({
      //     title: "Subaccount details saved",
      //     description: "Successfully saved your subaccount details.",
      //   });

      setClose();
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  //   useEffect(() => {
  //     if (details) {
  //       form.reset(details);
  //     }
  //   }, [details, form]);

  const isLoading = form.formState.isSubmitting;
  //CHALLENGE Create this form.
  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Sub Account Information</CardTitle>
          <CardDescription>Please enter business details</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                disabled={isLoading}
                control={form.control}
                name="subAccountLogo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Logo</FormLabel>
                    <FormControl>
                      <UploadFile
                        apiendpoint="subaccountLogo"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex md:flex-row gap-4">
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Account Name</FormLabel>
                      <FormControl>
                        <Input
                          required
                          placeholder="Your agency name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="agencyEmail"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Acount Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex md:flex-row gap-4">
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="agencyPhone"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Acount Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Phone" required {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                disabled={isLoading}
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input required placeholder="123 st..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex md:flex-row gap-4">
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input required placeholder="City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input required placeholder="State" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="zipcode"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Zipcpde</FormLabel>
                      <FormControl>
                        <Input required placeholder="Zipcode" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                disabled={isLoading}
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input required placeholder="Country" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <Loading /> : "Save Account Information"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
