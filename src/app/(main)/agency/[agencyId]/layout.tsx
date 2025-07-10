import Sidebar from "@/components/sidebar/Sidebar";
import { verifyUserExistOrAgencyInvitationExist } from "@/lib/queries";
import { currentUser } from "@clerk/nextjs/server";
import { ReactNode } from "react";

type props = {
  params: { agencyId: string };
  children: ReactNode;
};

export default async function layout({ children, params }: props) {
  const agencyId = verifyUserExistOrAgencyInvitationExist();
  const user = await currentUser();
  const { agencyId: age } = await params;
  return (
    <>
      <Sidebar id={age} type="agency" />
      {children}
    </>
  );
}
