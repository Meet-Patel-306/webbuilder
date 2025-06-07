"use server";

import { currentUser, clerkClient } from "@clerk/nextjs/server";
import db from "./db";
import { redirect } from "next/navigation";
import { Agency, Invitation, User } from "@/generated/prisma";

type UserType = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  agencyId: string;
  avatar: string;
};
// get user data and user create with agency Id
// tha mean user always belong to some agency
export const getUserData = async () => {
  const user = await currentUser();
  // user login or not
  if (!user) {
    redirect("/agency/sign-in");
  }
  // find user using email
  const userData = await db.user.findUnique({
    where: {
      email: user.emailAddresses[0].emailAddress,
    },
    include: {
      Agency: {
        // Include associated agency
        include: {
          SidebarOption: true, // Include agency's sidebar options
          SubAccount: {
            // Include all subaccounts under the agency
            include: {
              SidebarOption: true, // Include sidebar options for each subaccount
            },
          },
        },
      },
      Permissions: true, // Also include the user's permissions
    },
  });
  if (!userData) {
    return null;
  }
  return userData;
};

// create user  with agency Id
// tha mean user always belong to some agency
const createUser = async (user: UserType) => {
  // if user role is agency ower than return null
  if (user.role == "AGENCY_OWNER") {
    return null;
  }
  const res = await db.user.create({
    data: { ...user },
  });
  return res;
};

// saving a notification and activicy log in the database, typically when a user performs some action within an agency or its sub-account
const saveActivityLogAsNotification = async ({
  agencyId,
  subaccountId,
  description,
}: {
  agencyId: string;
  subaccountId?: string;
  description?: string;
}) => {
  const user = await currentUser();
  let userData;
  // if user not logging find user data
  if (!user) {
    // we need user data form particular agency subaccount
    const res = await db.user.findUnique({
      where: {
        Agency: { SubAccount: { some: { id: subaccountId } } },
      },
    });
    if (res) {
      userData = res;
    }
  } // if user logging
  else {
    const res = await db.user.findUnique({
      where: user?.emailAddresses[0].emailAddress,
    });
    if (res) {
      userData = res;
    }
  }
  if (!userData) {
    console.log("user not find");
    return;
  }
  if (subaccountId) {
    await db.notification.create({
      data: {
        notification: `${userData.name} | ${description}`,
        User: {
          connect: {
            id: userData.id,
          },
        },
        Agency: {
          connect: {
            id: agencyId,
          },
        },
        SubAccount: {
          connect: {
            id: subaccountId,
          },
        },
      },
    });
  } // if not subaccount id given that mean this notification given by agency
  else {
    await db.notification.create({
      data: {
        notification: `${userData.name} | ${description}`,
        User: {
          connect: {
            id: userData.id,
          },
        },
        Agency: {
          connect: {
            id: agencyId,
          },
        },
      },
    });
  }
};

// verify user or verifyy Agency Invitation exist
export const verifyUserExistOrAgencyInvitationExist = async () => {
  const user = await currentUser();
  // user login or not
  if (!user) {
    redirect("/agency/sign-in");
  }
  // invitation exist or not
  const invitationExist = await db.invitation.findUnique({
    where: {
      email: user.emailAddresses[0].emailAddress,
      status: "PENDING",
    },
  });
  // check if user already in agency or not
  if (invitationExist) {
    const existUser = await getUserData();
    if (existUser) {
      console.log(existUser);
      return existUser.agencyId;
    } else {
      const userData = await createUser({
        name: `${user.firstName ?? ""} ${user.lastName ?? ""}`,
        email: user.emailAddresses[0].emailAddress,
        role: invitationExist.role,
        createdAt: new Date(),
        updatedAt: new Date(),
        agencyId: invitationExist.agencyId,
        avatar: user.imageUrl,
        id: user.id,
      });
      // send notificantion for join
      await saveActivityLogAsNotification({
        agencyId: invitationExist.agencyId,
        subaccountId: undefined,
        description: "New Joined",
      });
      if (userData) {
        const client = await clerkClient();
        await client.users.updateUserMetadata(user.id, {
          privateMetadata: {
            role: invitationExist.role || "SUBACCOUNT_USER",
          },
        });
        await db.invitation.delete({
          where: {
            id: invitationExist.id,
          },
        });
        return userData.agencyId;
      } // if not userdata get
      else {
        return null;
      }
    }
  } //if not invitation exist
  else {
    // that mean user already at agency
    const agencyUser = await db.user.findUnique({
      where: {
        email: user.emailAddresses[0].emailAddress,
      },
    });
    if (agencyUser) {
      return agencyUser.agencyId;
    } else {
      return null;
    }
  }
};
