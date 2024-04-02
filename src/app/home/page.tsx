import { Account, UserProfile } from "@/API";
import AccountClientComponent from "@/page_components/account/AccountClientComponent";
import HomeClientComponent from "@/page_components/home/HomeClientComponent";
import SearchClientComponent from "@/page_components/search/SearchClientComponent";
import fetchAccount from "@/utils/data/fetchAccount";
import {
  fetchBusinessProfiles,
  individualBusinessProfileReturnType,
} from "@/utils/data/fetchBusinessProfiles";
import { fetchLikedBusinessProfiles } from "@/utils/data/fetchLikedBusinessProfiles";
import { cookies } from "next/headers";

export default async function HomePage() {
  const cookie = cookies();
  const userId = cookie.get("userId")?.value;

  let businessProfiles: individualBusinessProfileReturnType[] = [];
  if (userId) {
    businessProfiles = await fetchLikedBusinessProfiles({ userId });
  }

  return (
    <HomeClientComponent
      businessProfiles={businessProfiles}
      userId={userId || ""}
    />
  );
}
