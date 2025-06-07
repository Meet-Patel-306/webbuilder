import {
  verifyUserExistOrAgencyInvitationExist,
  getUserData,
} from "@/lib/queries";

export default async function Page() {
  const agencyId = await verifyUserExistOrAgencyInvitationExist();
  const user = await getUserData();
  return <> {agencyId && <div>agency</div>}</>;
}
