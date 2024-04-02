import { Account, UserProfile } from "@/API";
import AccountClientComponent from "@/page_components/account/AccountClientComponent";
import HomeClientComponent from "@/page_components/home/HomeClientComponent";
import InterestsClientComponent from "@/page_components/interests/InterestsClientComponent";
import SearchClientComponent from "@/page_components/search/SearchClientComponent";
import fetchAccount from "@/utils/data/fetchAccount";
import {
  fetchBusinessProfiles,
  individualBusinessProfileReturnType,
} from "@/utils/data/fetchBusinessProfiles";
import { fetchLikedBusinessProfiles } from "@/utils/data/fetchLikedBusinessProfiles";
import fetchUserProfile from "@/utils/data/fetchUserProfile";
import { cookies } from "next/headers";

export default async function InterestsPage() {
  const cookie = cookies();
  const userId = cookie.get("userId")?.value;

  let userProfile: UserProfile;
  let interestTags: string[] = [];
  if (userId) {
    userProfile = await fetchUserProfile({ userId });

    if (userProfile.interestTags) {
      interestTags = userProfile.interestTags;
    }
  }

  return (
    <InterestsClientComponent
      interestTags={interestTags}
      userId={userId || ""}
    />
  );
}
