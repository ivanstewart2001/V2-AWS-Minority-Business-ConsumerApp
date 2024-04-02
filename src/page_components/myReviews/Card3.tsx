import React, { FC } from "react";
import NcImage from "@/shared/NcImage/NcImage";
import { _getImgRd, _getTagNameRd } from "@/contains/fakeData";
import PostCardMeta from "@/components/PostCardMeta/PostCardMeta";
import Link from "next/link";

export interface Card3Props {
  className?: string;
  businessId: string;
  businessName: string;
  reviewText: string;
  updatedAt: number;
  profilePicture?: string;
}

const Card3: FC<Card3Props> = ({
  className = "h-full",
  businessId,
  businessName,
  reviewText,
  updatedAt,
  profilePicture,
}) => {
  return (
    <div
      className={`nc-Card3 relative flex flex-col-reverse sm:flex-row sm:items-center rounded-[40px] group ${className}`}
      data-nc-id="Card3"
    >
      <div className="flex flex-col flex-grow">
        <div className="space-y-5 mb-4">
          <div>
            <h2
              className={`nc-card-title block font-semibold text-neutral-900 dark:text-neutral-100 text-xl`}
            >
              <Link
                href={`/search/${businessId}`}
                className="line-clamp-2 capitalize"
                title={"title"}
              >
                {businessName}
              </Link>
            </h2>
            <div className="hidden sm:block sm:mt-2">
              <span className="text-neutral-500 dark:text-neutral-400 text-base line-clamp-1">
                {reviewText}
              </span>
            </div>
          </div>
          <PostCardMeta updatedAt={updatedAt} />
        </div>
      </div>

      <div
        className={`block flex-shrink-0 sm:w-56 sm:ml-6 rounded-3xl overflow-hidden mb-5 sm:mb-0`}
      >
        <Link
          href={`/search/${businessId}`}
          className={`block w-full h-0 aspect-h-9 sm:aspect-h-16 aspect-w-16 `}
        >
          <NcImage
            alt=""
            fill
            src={profilePicture || _getImgRd()}
            containerClassName="absolute inset-0"
            sizes="(max-width: 768px) 100vw, 30vw"
          />
        </Link>
      </div>
    </div>
  );
};

export default Card3;
