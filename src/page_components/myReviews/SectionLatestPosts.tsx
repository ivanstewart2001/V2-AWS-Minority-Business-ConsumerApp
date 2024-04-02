import React, { FC } from "react";
import Heading from "@/components/Heading/Heading";
import Pagination from "@/shared/Pagination/Pagination";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import WidgetCategories from "./WidgetCategories";
import WidgetPosts from "./WidgetPosts";
import Card3 from "./Card3";
import { individualReviewReturnType } from "@/utils/data/fetchReview";
import { individualBusinessProfileReturnType } from "@/utils/data/fetchBusinessProfiles";

//
export interface SectionLatestPostsProps {
  className?: string;
  postCardName?: "card3";
  userReviews: individualReviewReturnType[];
  businessProfiles: individualBusinessProfileReturnType[];
}

const SectionLatestPosts: FC<SectionLatestPostsProps> = ({
  postCardName = "card3",
  className = "",
  userReviews,
  businessProfiles,
}) => {
  return (
    <div className={`nc-SectionLatestPosts relative ${className}`}>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-2/3 xl:pr-14">
          <Heading>My Reviews 🎈</Heading>
          <div className={`grid gap-6 md:gap-8 grid-cols-1`}>
            {userReviews.map((userReview, index) => {
              const businessProfile = businessProfiles.filter(
                (business) => business.id === userReview.businessId
              )[0];

              return (
                <Card3
                  key={index}
                  className=""
                  businessId={businessProfile.id}
                  businessName={businessProfile.name}
                  reviewText={userReview.text}
                  updatedAt={userReview.updatedAt}
                  profilePicture={businessProfile.profilePictureUrl}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionLatestPosts;
