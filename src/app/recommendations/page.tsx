import { Account, UserProfile } from "@/API";
import AccountClientComponent from "@/page_components/account/AccountClientComponent";
import ReccommendationsClientComponent from "@/page_components/recommendations/RecommendationsClientComponent";
import SearchClientComponent from "@/page_components/search/SearchClientComponent";
import fetchAccount from "@/utils/data/fetchAccount";
import {
  fetchBusinessProfiles,
  individualBusinessProfileReturnType,
} from "@/utils/data/fetchBusinessProfiles";
import fetchUserProfile from "@/utils/data/fetchUserProfile";
import { cookies } from "next/headers";

export default async function ReccommendationsPage() {
  const cookie = cookies();
  const userId = cookie.get("userId")?.value;

  let businessProfiles: individualBusinessProfileReturnType[] = [];
  if (userId) {
    const userProfile = await fetchUserProfile({ userId });
    const interestTags = userProfile.interestTags || [];

    businessProfiles = await fetchBusinessProfiles({
      userId,
      tags: interestTags,
    });
  }

  return (
    <ReccommendationsClientComponent
      businessProfiles={businessProfiles}
      userId={userId || ""}
    />
  );
}
