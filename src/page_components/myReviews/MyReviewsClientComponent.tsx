import React from "react";
import SectionLatestPosts from "./SectionLatestPosts";
import BgGlassmorphism from "@/components/BgGlassmorphism/BgGlassmorphism";
import { individualBusinessProfileReturnType } from "@/utils/data/fetchBusinessProfiles";
import { individualReviewReturnType } from "@/utils/data/fetchReview";

interface MyReviewsClientComponentProps {
  businessProfiles: individualBusinessProfileReturnType[];
  userReviews: individualReviewReturnType[];
}

export default function MyReviewsClientComponent({
  businessProfiles,
  userReviews,
}: MyReviewsClientComponentProps) {
  return (
    <div className="nc-BlogPage overflow-hidden relative">
      {/* ======== BG GLASS ======== */}
      <BgGlassmorphism />
      {/* ======== ALL SECTIONS ======== */}
      <div className="container relative">
        {/* === SECTION 8 === */}
        <SectionLatestPosts
          className="py-16 lg:py-28"
          businessProfiles={businessProfiles}
          userReviews={userReviews}
        />

        <div className="pb-16 lg:pb-28">
          <hr className="border-neutral-200 dark:border-neutral-700" />
        </div>
      </div>
    </div>
  );
}
