"use client";

import { v4 as uuid4 } from "uuid";
import {
  updateAgencyDetails,
  saveActivityLogAsNotification,
  deleteAgency,
  initUser,
  upsertAgency,
} from "@/lib/queries";
import { useRouter } from "next/navigation";
import { Agency } from "@/generated/prisma";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import UploadFile from "../global/UploadFile";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Loader2Icon } from "lucide-react";
import { NumberInput } from "@tremor/react";
import { useState } from "react";
import { toast } from "sonner";

type props = {
  data: Partial<Agency>;
};
const formSchema = z.object({
  name: z.string().min(2, { message: "Agency name must be atleast 2 char." }),
  agencyEmail: z.string().email().min(1),
  agencyPhone: z.string().min(1),
  agencyLogo: z.string(),
  address: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  country: z.string().min(1),
  zipcode: z.string().min(1),
  whiteLabel: z.boolean(),
});
export default function AgencyDetails({ data }: props) {
  const router = useRouter();
  const [confirmation, setConfirmation] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name ?? "",
      agencyEmail: data?.agencyEmail ?? "",
      agencyPhone: data?.agencyPhone ?? "",
      agencyLogo: data?.agencyLogo ?? "",
      address: data?.address ?? "",
      city: data?.city ?? "",
      state: data?.state ?? "",
      country: data?.country ?? "",
      zipcode: data?.zipcode ?? "",
      whiteLabel: false,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const handleSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
      await initUser({ role: "AGENCY_OWNER" });
      const res = await upsertAgency({
        name: value.name,
        id: data?.id ? data.id : uuid4(),
        connectAccountId: "",
        agencyEmail: value.agencyEmail,
        agencyPhone: value.agencyPhone,
        agencyLogo: value.agencyLogo,
        address: value.address,
        city: value.city,
        state: value.state,
        country: value.country,
        zipcode: value.zipcode,
        goal: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
        whiteLabel: value.whiteLabel,
      });
      console.log(res);
      return router.refresh();
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteAgency = () => {
    if (!data?.id) return;
    toast.promise(
      async () => {
        await deleteAgency(data?.id as string);
        return router.refresh();
      },
      {
        loading: "Deleting Agency...",
        success: "Agency Delete Successfully",
        error: "Something wrong with server...",
      }
    );
  };
  return (
    <>
      <section className="flex justify-center mt-10">
        <AlertDialog>
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Agency Information</CardTitle>
              <CardDescription>
                Lets create an agency for you business. You can edit agency
                settings later from the agency settings tab.
              </CardDescription>
              <CardAction>
                <Button variant="link">Sign Up</Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="agencyLogo"
                    disabled={isLoading}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Agency Logo</FormLabel>
                        <FormControl>
                          <div className="flex justify-center">
                            <UploadFile
                              apiendpoint="agencyLogo"
                              onChange={field.onChange}
                              value={field.value}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="name"
                    disabled={isLoading}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Agency Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Agency Name"
                            required
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="agencyEmail"
                    disabled={isLoading}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Agency Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Agency Email"
                            type="email"
                            required
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="agencyPhone"
                    disabled={isLoading}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Agency Phone</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Agency Phone"
                            required
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
                    name="whiteLabel"
                    render={({ field }) => {
                      return (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border gap-4 p-4">
                          <div>
                            <FormLabel>Whitelabel Agency</FormLabel>
                            <FormDescription className="mt-2">
                              Turning on whilelabel mode will show your agency
                              logo to all sub accounts by default. You can
                              overwrite this functionality through sub account
                              settings.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    disabled={isLoading}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="xyz " required {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
                    <FormField
                      control={form.control}
                      name="country"
                      disabled={isLoading}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <Input placeholder="" required {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="state"
                      disabled={isLoading}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input placeholder="" required {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="city"
                      disabled={isLoading}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="" required {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="zipcode"
                      disabled={isLoading}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Zipcode</FormLabel>
                          <FormControl>
                            <Input placeholder="" required {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {data?.id && (
                    <div>
                      <FormLabel>Create A Goal</FormLabel>
                      <FormDescription className="mt-2">
                        Create a goal for your agency. As your business grows
                        your goals grow too so don't forget to set the bar
                        higher!
                      </FormDescription>
                      <NumberInput
                        placeholder="Your SubAccount Goal"
                        className="focus:outline-none px-2 rounded-lg mt-2"
                        defaultValue={data?.goal}
                        onValueChange={async (val) => {
                          if (!data?.id) return;
                          await updateAgencyDetails(data.id, { goal: val });
                          // save activity log
                          await saveActivityLogAsNotification({
                            agencyId: data.id,
                            description: `Updated the agency goal to | ${val} Sub Account`,
                            subaccountId: undefined,
                          });
                          router.refresh();
                        }}
                        min={1}
                      />
                    </div>
                  )}
                  {isLoading ? (
                    <Button size="sm" disabled>
                      <Loader2Icon className="animate-spin" /> Please wait
                    </Button>
                  ) : (
                    <Button type="submit" disabled={isLoading}>
                      Save Agency Information
                    </Button>
                  )}
                </form>
              </Form>
              {data?.id && (
                <div>
                  <div className="border-2 p-2 border-red-700 rounded-md mt-2 bg-red-700/25">
                    <div className="text-red-700">Danger Zon</div>
                    <div className="text-muted-foreground">
                      Deleting your agency cann't be undone. This will also
                      delete all sub accounts and all data related to your sub
                      accounts. Sub accounts will no longer have access to
                      funnels, contacts etc.
                    </div>
                    <AlertDialogTrigger className="mt-2 ">
                      <Button className="bg-red-700 text-white hover:bg-red-700">
                        Delete Agency
                      </Button>
                    </AlertDialogTrigger>
                  </div>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="mt-4 space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Please type <strong>Delete Account</strong> to confirm:
                      </p>
                      <Input
                        value={confirmation}
                        onChange={(e) => setConfirmation(e.target.value)}
                        placeholder="Type here..."
                      />
                    </div>

                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-700 text-white hover:bg-red-700"
                        disabled={!(confirmation === "Delete Account")}
                        onClick={handleDeleteAgency}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </div>
              )}
            </CardContent>
          </Card>
        </AlertDialog>
      </section>
    </>
  );
}
