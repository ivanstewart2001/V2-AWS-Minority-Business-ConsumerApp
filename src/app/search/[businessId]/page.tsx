import { Account, UserProfile } from "@/API";
import AccountClientComponent from "@/page_components/account/AccountClientComponent";
import IndividualBusinessClientComponent from "@/page_components/individualSearch/IndividualBusinessClientComponent";
import SearchClientComponent from "@/page_components/search/SearchClientComponent";
import fetchAccount from "@/utils/data/fetchAccount";
import { fetchBusinessProfile } from "@/utils/data/fetchBusinessProfile";
import {
  fetchBusinessProfiles,
  individualBusinessProfileReturnType,
} from "@/utils/data/fetchBusinessProfiles";
import {
  fetchReview,
  individualReviewReturnType,
} from "@/utils/data/fetchReview";
import fetchUserProfile from "@/utils/data/fetchUserProfile";
import { cookies } from "next/headers";

export default async function SearchBusinessPage({
  params: { businessId },
}: {
  params: { businessId: string };
}) {
  const cookie = cookies();
  const userId = cookie.get("userId")?.value;

  let businessProfile: individualBusinessProfileReturnType | {} = {};
  if (userId && businessId) {
    businessProfile = (await fetchBusinessProfile({
      userId,
      businessId,
    })) as individualBusinessProfileReturnType;
  }

  let review: individualReviewReturnType | {} = {};
  if (userId && businessId) {
    review = (await fetchReview({
      userId,
      businessId,
    })) as individualReviewReturnType;
  }

  return (
    <IndividualBusinessClientComponent
      businessProfile={businessProfile}
      review={review}
      userId={userId || ""}
    />
  );
}
