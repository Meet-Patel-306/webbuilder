import { getUserData } from "@/lib/queries";
import MenuOption from "./MenuOption";

type props = {
  id: string;
  type: "agency" | "subAccount";
};

export default async function Sidebar({ id, type }: props) {
  const user = await getUserData();
  if (!user || !user.Agency) return null;
  //   get user agency or subaccount details
  const details =
    type === "agency"
      ? user.Agency
      : user.Agency.SubAccount.find((subaccount) => subaccount.id === id);
  // user don't have agency or subaccount details
  if (!details) return null;
  const isWhiteLableAgency = user.Agency.whiteLabel;
  let sideBarLogo = user.Agency.agencyLogo;
  if (!isWhiteLableAgency && type === "subAccount") {
    sideBarLogo =
      user.Agency.SubAccount.find((subaccount) => subaccount.id === id)
        ?.subAccountLogo || user.Agency.agencyLogo;
  }
  let sideBarOption =
    type === "agency"
      ? user.Agency.AgencySidebarOption || []
      : user.Agency.SubAccount.find((subaccount) => subaccount.id === id)
          ?.SidebarOption || [];

  // get all subaccount with their permission
  const subaccounts = user.Agency.SubAccount.filter((subaccount) =>
    user.permission.find(
      (permission) =>
        permission.subAccountId === subaccount.id && permission.access === true
    )
  );
  return (
    <>
      <MenuOption
        defaultOpen={true}
        sidebarLogo={sideBarLogo}
        sidebarOption={sideBarOption}
        subaccount={subaccounts}
        id={id}
        user={user}
        details={details}
      />
      <MenuOption
        sidebarLogo={sideBarLogo}
        sidebarOption={sideBarOption}
        subaccount={subaccounts}
        id={id}
        user={user}
        details={details}
      />
    </>
  );
}
