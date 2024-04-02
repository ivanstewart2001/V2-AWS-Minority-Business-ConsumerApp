"use client";

import React, { useState } from "react";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import CardNFT from "@/components/CardNFT";
import HeaderFilterSearchPage from "@/components/HeaderFilterSearchPage";
import SectionBecomeAnAuthor from "@/components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
import SectionSliderCollections from "@/components/SectionSliderCollections";
import ButtonCircle from "@/shared/Button/ButtonCircle";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import Pagination from "@/shared/Pagination/Pagination";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import {
  fetchBusinessProfiles,
  individualBusinessProfileReturnType,
} from "@/utils/data/fetchBusinessProfiles";

interface SearchClientComponentProps {
  businessProfiles: individualBusinessProfileReturnType[];
  userId: string;
}

export default function SearchClientComponent({
  businessProfiles,
  userId,
}: SearchClientComponentProps) {
  const [allBusinessProfiles, setAllBusinessProfiles] =
    useState<individualBusinessProfileReturnType[]>(businessProfiles);

  return (
    <div className={`nc-PageSearch `}>
      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
        {/* FILTER */}
        <HeaderFilterSearchPage
          userId={userId}
          setAllBusinessProfiles={setAllBusinessProfiles}
        />

        {allBusinessProfiles.length === 0 ? (
          <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
            <p>No business profiles to show</p>
          </div>
        ) : (
          <main>
            {/* LOOP ITEMS */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
              {allBusinessProfiles.map((businessProfile, index) => (
                <CardNFT
                  key={index}
                  businessProfile={businessProfile}
                  userId={userId}
                  isLiked={businessProfile.liked}
                />
              ))}
            </div>
          </main>
        )}
      </div>
    </div>
  );
}
