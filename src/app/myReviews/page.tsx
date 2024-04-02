import { Account, UserProfile } from "@/API";
import AccountClientComponent from "@/page_components/account/AccountClientComponent";
import MyReviewsClientComponent from "@/page_components/myReviews/MyReviewsClientComponent";
import SearchClientComponent from "@/page_components/search/SearchClientComponent";
import fetchAccount from "@/utils/data/fetchAccount";
import { fetchBusinessProfile } from "@/utils/data/fetchBusinessProfile";
import {
  fetchBusinessProfiles,
  individualBusinessProfileReturnType,
} from "@/utils/data/fetchBusinessProfiles";
import { individualReviewReturnType } from "@/utils/data/fetchReview";
import fetchUserProfile from "@/utils/data/fetchUserProfile";
import { fetchUserReviews } from "@/utils/data/fetchUserReviews";
import { cookies } from "next/headers";

export default async function MyReviewsPage() {
  const cookie = cookies();
  const userId = cookie.get("userId")?.value;

  let userReviews: individualReviewReturnType[] = [];
  if (userId) {
    userReviews = await fetchUserReviews({ userId });
  }

  let businessProfiles: individualBusinessProfileReturnType[] = [];
  if (userId && userReviews.length > 0) {
    for (const review of userReviews) {
      try {
        const businessProfile = (await fetchBusinessProfile({
          userId,
          businessId: review.businessId,
        })) as individualBusinessProfileReturnType;
        businessProfiles.push(businessProfile);
      } catch (error) {}
    }
  }

  return (
    <MyReviewsClientComponent
      businessProfiles={businessProfiles}
      userReviews={userReviews}
    />
  );
}
