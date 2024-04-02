import { Account, UserProfile } from "@/API";
import AccountClientComponent from "@/page_components/account/AccountClientComponent";
import SearchClientComponent from "@/page_components/search/SearchClientComponent";
import fetchAccount from "@/utils/data/fetchAccount";
import {
  fetchBusinessProfiles,
  individualBusinessProfileReturnType,
} from "@/utils/data/fetchBusinessProfiles";
import fetchUserProfile from "@/utils/data/fetchUserProfile";
import { cookies } from "next/headers";

export default async function SearchPage() {
  const cookie = cookies();
  const userId = cookie.get("userId")?.value;

  let businessProfiles: individualBusinessProfileReturnType[] = [];
  if (userId) {
    businessProfiles = await fetchBusinessProfiles({ userId });
  }

  return (
    <SearchClientComponent
      businessProfiles={businessProfiles}
      userId={userId || ""}
    />
  );
}
