"use client";

import React, { FC, useEffect, useState } from "react";
import Avatar from "@/shared/Avatar/Avatar";
import NcImage from "@/shared/NcImage/NcImage";
import ItemTypeImageIcon from "./ItemTypeImageIcon";
import LikeButton from "./LikeButton";
import Prices from "./Prices";
import { ClockIcon } from "@heroicons/react/24/outline";
import ItemTypeVideoIcon from "./ItemTypeVideoIcon";
import Link from "next/link";
import useGetRandomData from "@/hooks/useGetRandomData";
import { individualBusinessProfileReturnType } from "@/utils/data/fetchBusinessProfiles";

export interface CardNFTProps {
  className?: string;
  isLiked?: boolean;
  businessProfile: individualBusinessProfileReturnType;
  userId: string;
}

const CardNFT: FC<CardNFTProps> = ({
  className = "",
  isLiked,
  businessProfile,
  userId,
}) => {
  const { nftImageRd } = useGetRandomData();

  return (
    <div className={`nc-CardNFT relative flex flex-col group ${className}`}>
      <div className="relative flex-shrink-0 ">
        <div>
          <NcImage
            containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0 rounded-3xl overflow-hidden z-0"
            src={
              businessProfile.profilePictureUrl
                ? businessProfile.profilePictureUrl
                : nftImageRd
            }
            className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-300 ease-in-out will-change-transform"
          />
        </div>

        <LikeButton
          liked={isLiked}
          userId={userId}
          businessId={businessProfile.id}
          className="absolute top-3 right-3 z-10 !h-9"
        />
        <div className="absolute top-3 inset-x-3 flex"></div>
      </div>

      <div className="px-2 py-5 space-y-3">
        <h2 className={`text-lg font-medium`}>{businessProfile.name}</h2>
      </div>

      <Link
        href={`/search/${businessProfile.id}`}
        className="absolute inset-0"
      ></Link>
    </div>
  );
};

export default CardNFT;
