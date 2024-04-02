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

interface ReccommendationsClientComponentProps {
  businessProfiles: individualBusinessProfileReturnType[];
  userId: string;
}

export default function ReccommendationsClientComponent({
  businessProfiles,
  userId,
}: ReccommendationsClientComponentProps) {
  const [allBusinessProfiles, setAllBusinessProfiles] =
    useState<individualBusinessProfileReturnType[]>(businessProfiles);

  return (
    <div className={`nc-PageSearch `}>
      {/* HEADER */}
      <div className="w-full">
        <div className="relative w-full h-30 md:h-40 2xl:h-50"></div>
        <div className="relative container -mt-14 lg:-mt-20">
          <div className=" bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 p-5 lg:p-8 rounded-3xl md:rounded-[40px] shadow-xl flex flex-col md:flex-row lg:items-center">
            <div className="mt-5 md:mt-0 md:ml-8 xl:ml-14 flex-grow">
              <div className="max-w-screen-sm ">
                <h2 className="inline-block text-2xl sm:text-3xl lg:text-4xl font-semibold">
                  {"Recommendations"}
                </h2>
                <span className="block mt-4 text-sm text-neutral-500 dark:text-neutral-400">
                  Discover minority-owned businesses tailored to your interests.
                  Explore, connect, and support businesses you'll love!
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ====================== END HEADER ====================== */}

      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
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
