"use client";

import React, { useEffect, useState } from "react";
import { GraphQLResult, generateClient } from "aws-amplify/api";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { getUserProfile as getUserProfileMutation } from "@/graphql/queries";
import { updateUserProfile as updateUserProfileMutation } from "@/graphql/mutations";

const client = generateClient();

export interface LikeButtonProps {
  className?: string;
  liked?: boolean;
  userId: string;
  businessId: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  className = "",
  liked = false,
  userId,
  businessId,
}) => {
  const [isLiked, setIsLiked] = useState(liked);

  const toggleLikeMutation = useMutation(
    async () => {
      console.log("userId", userId);

      const user = await client.graphql({
        query: getUserProfileMutation,
        variables: {
          id: userId,
        },
      });

      if (!user.data) {
        throw new Error("User not found");
      }

      if (!user.data.getUserProfile?.likedBusinesses) {
        await client.graphql({
          query: updateUserProfileMutation,
          variables: {
            input: {
              id: userId,
              likedBusinesses: [businessId],
            },
          },
        });
      } else if (
        user.data.getUserProfile?.likedBusinesses &&
        !user.data.getUserProfile?.likedBusinesses.includes(businessId)
      ) {
        await client.graphql({
          query: updateUserProfileMutation,
          variables: {
            input: {
              id: userId,
              likedBusinesses: [
                ...user.data.getUserProfile.likedBusinesses,
                businessId,
              ],
            },
          },
        });
      } else if (
        user.data.getUserProfile?.likedBusinesses &&
        user.data.getUserProfile?.likedBusinesses.includes(businessId)
      ) {
        await client.graphql({
          query: updateUserProfileMutation,
          variables: {
            input: {
              id: userId,
              likedBusinesses: user.data.getUserProfile.likedBusinesses.filter(
                (id: string) => id !== businessId
              ),
            },
          },
        });
      }
    },
    {
      onError: (err: Error) => {
        toast(err.message, {
          autoClose: 3000,
          type: "error",
          position: "bottom-right",
        });
      },
      onSuccess: (data) => {
        setIsLiked(!isLiked);
      },
    }
  );

  return (
    <button
      className={`w-9 h-9 flex items-center justify-center rounded-full bg-white dark:bg-slate-900 text-neutral-700 dark:text-slate-200 nc-shadow-lg ${className}`}
      onClick={() => {
        toggleLikeMutation.mutate();
      }}
      disabled={toggleLikeMutation.isLoading}
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path
          d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
          stroke={isLiked ? "#ef4444" : "currentColor"}
          fill={isLiked ? "#ef4444" : "none"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default LikeButton;
