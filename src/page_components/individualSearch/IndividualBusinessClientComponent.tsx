"use client";

import React, { useEffect } from "react";
import LikeButton from "@/components/LikeButton";
import { nftsLargeImgs, personNames } from "@/contains/fakeData";
import NcImage from "@/shared/NcImage/NcImage";
import AccordionInfo from "@/components/AccordionInfo";
import Badge from "@/shared/Badge/Badge";
import Review from "./Review";
import { individualBusinessProfileReturnType } from "@/utils/data/fetchBusinessProfiles";
import { useRouter } from "next/navigation";
import { TwMainColor } from "@/data/types";
import { EarthIcon, MapPinIcon } from "lucide-react";
import { individualReviewReturnType } from "@/utils/data/fetchReview";

interface IndividualBusinessClientComponentProps {
  businessProfile: individualBusinessProfileReturnType | {};
  review: individualReviewReturnType | {};
  userId: string;
}

export default function IndividualBusinessClientComponent({
  businessProfile,
  userId,
  review,
}: IndividualBusinessClientComponentProps) {
  const router = useRouter();

  useEffect(() => {
    if (Object.keys(businessProfile).length === 0) {
      router.push("/search");
    }
  }, []);

  const {
    name,
    liked,
    id,
    description,
    profilePictureUrl,
    contactInfo,
    operatingHours,
    tags,
    state,
    address,
    website,
    album,
  } = businessProfile as individualBusinessProfileReturnType;

  const convertTo12HourFormat = (time: string) => {
    const [hours, minutes] = time.split(":");
    const date = new Date();
    date.setHours(Number(hours));
    date.setMinutes(Number(minutes));
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const colors: TwMainColor[] = [
    "blue",
    "gray",
    "green",
    "indigo",
    "pink",
    "purple",
    "red",
    "yellow",
  ];

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const details: { name: string; content: string }[] = [];

  if (description) {
    details.push({ name: "Description", content: description });
  }

  if (contactInfo) {
    details.push({
      name: "Contact Information",
      content: `Email: ${contactInfo.email || ""} <br /> Phone: ${
        contactInfo.phoneNumber || ""
      }`,
    });
  }

  if (operatingHours) {
    details.push({
      name: "Operating Hours",
      content: `${operatingHours
        .map(
          ({ closes, dayOfWeek, opens }) =>
            `${dayOfWeek}: ${convertTo12HourFormat(
              opens
            )} - ${convertTo12HourFormat(closes)}`
        )
        .join("<br />")}`,
    });
  }

  if (website) {
    details.push({
      name: "Website",
      content: `<a href="${website}" target="_blank">${website}</a>`,
    });
  }

  function ImageContainer({ imageUrl }: { imageUrl: string }) {
    return (
      <div className={`nc-CardNFT relative flex flex-col group`}>
        <div className="relative flex-shrink-0 ">
          <div>
            <NcImage
              containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0 rounded-3xl overflow-hidden z-0"
              src={imageUrl || ""}
              className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-300 ease-in-out will-change-transform"
            />
          </div>
        </div>
      </div>
    );
  }

  const renderSection1 = () => {
    return (
      <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
        {/* ---------- 1 ----------  */}
        <div className="mb-4 space-y-5">
          <div className="flex space-x-2 items-center">
            {tags &&
              tags.map((tag, index) => (
                <Badge key={index} color={getRandomColor()} name={tag} />
              ))}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
            {name}
          </h2>

          {/* ---------- 4 ----------  */}
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm">
            <div className="flex items-center ">
              <EarthIcon />
              <span className="ml-2.5 text-neutral-500 dark:text-neutral-400 flex flex-col">
                <span className="text-sm">State</span>
                <span className="text-neutral-900 dark:text-neutral-200 font-medium flex items-center">
                  <span>{state}</span>
                </span>
              </span>
            </div>
            <div className="hidden sm:block h-6 border-l border-neutral-200 dark:border-neutral-700"></div>
            {address && (
              <div className="flex items-center">
                <MapPinIcon />
                <span className="ml-2.5 text-neutral-500 dark:text-neutral-400 flex flex-col">
                  <span className="text-sm">Address</span>
                  <span className="text-neutral-900 dark:text-neutral-200 font-medium flex items-center">
                    <span>{address}</span>
                  </span>
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ---------- 7 ----------  */}
        {/* PRICE */}
        <div className="mt-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
            {album &&
              album.map((imageUrl, index) => (
                <ImageContainer imageUrl={imageUrl} />
              ))}
          </div>
        </div>

        {/* ---------- 9 ----------  */}
        <div className="pt-9">
          <Review userId={userId} businessId={id} review={review} />
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-NftDetailPage`}>
      {/* MAIn */}
      <main className="container mt-11 mb-20 flex ">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14">
          {/* CONTENT */}
          <div className="space-y-8 lg:space-y-10">
            {/* HEADING */}
            <div className="relative">
              <NcImage
                src={profilePictureUrl || nftsLargeImgs[0]}
                containerClassName="aspect-w-11 aspect-h-12 rounded-3xl overflow-hidden z-0 relative"
                fill
              />

              {/* META FAVORITES */}
              <LikeButton
                liked={liked}
                userId={userId}
                businessId={id}
                className="absolute right-3 top-3 "
              />
            </div>

            <AccordionInfo data={details} />
          </div>

          {/* SIDEBAR */}
          <div className="pt-10 lg:pt-0 xl:pl-10 border-t-2 border-neutral-200 dark:border-neutral-700 lg:border-t-0">
            {renderSection1()}
          </div>
        </div>
      </main>
    </div>
  );
}
