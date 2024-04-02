import { Account, UserProfile } from "@/API";
import AccountClientComponent from "@/page_components/account/AccountClientComponent";
import fetchAccount from "@/utils/data/fetchAccount";
import fetchUserProfile from "@/utils/data/fetchUserProfile";
import { cookies } from "next/headers";

export default async function AccountPage() {
  const cookie = cookies();
  const userId = cookie.get("userId")?.value;

  let userProfile: UserProfile | undefined;
  if (userId) {
    userProfile = await fetchUserProfile({ userId });
  }

  return <AccountClientComponent userProfile={userProfile} userId={userId} />;
}
