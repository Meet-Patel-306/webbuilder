import AgencyDetails from "@/components/form/AgencyDetails";
import { Plan } from "@/generated/prisma";
import {
  verifyUserExistOrAgencyInvitationExist,
  getUserData,
} from "@/lib/queries";
import { redirect } from "next/navigation";

export default async function Page({
  searchParam,
}: {
  searchParam: { plan: Plan; state: string; code: string };
}) {
  const agencyId = await verifyUserExistOrAgencyInvitationExist();
  const user = await getUserData();

  if (agencyId) {
    if (user?.role === "SUBACCOUNT_USER" || user?.role === "SUBACCOUNT_GUEST") {
      return redirect(`/subaccount`);
    } else if (user?.role === "AGENCY_ADMIN" || user?.role === "AGENCY_OWNER") {
      if (searchParam.plan) {
        return redirect(`/agency/${agencyId}/billing?plan=${searchParam.plan}`);
      }
      if (searchParam.state) {
        const statePath = searchParam.state.split("__")[0];
        const stateAgencyId = searchParam.state.split("__")[1];
        return redirect(
          `/agency/${stateAgencyId}/${statePath}?code=${searchParam.code}`
        );
      } //no searchparams than redirect to /agency/agencyId
      else {
        return redirect(`/agency/${agencyId}`);
      }
    } else {
      return <div>UnAuth</div>;
    }
  }
  return (
    <>
      <AgencyDetails data={{ agencyEmail: "no@gmail.com" }} />
    </>
  );
}
