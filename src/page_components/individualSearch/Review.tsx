"use client";

import React from "react";
import Rating from "@mui/material/Rating";
import { useMutation } from "react-query";
import { GraphQLResult, generateClient } from "aws-amplify/api";
import {
  createReviews as createReviewsMutation,
  deleteReviews as deleteReviewsMutation,
  updateReviews as updateReviewsMutation,
} from "@/graphql/mutations";
import { toast } from "react-toastify";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import { individualReviewReturnType } from "@/utils/data/fetchReview";
import Textarea from "@/shared/Textarea/Textarea";

const client = generateClient();

interface ReviewProps {
  userId: string;
  businessId: string;
  review: individualReviewReturnType | {};
}

export default function Review({ userId, businessId, review }: ReviewProps) {
  const [option, setOption] = React.useState<"create" | "update">(
    Object.keys(review).length > 0 ? "update" : "create"
  );

  const [starRating, setStarRating] = React.useState<number>(
    (review as individualReviewReturnType).rating || 1
  );
  const [text, setText] = React.useState<string>(
    (review as individualReviewReturnType).text || ""
  );

  const addReviewMutation = useMutation(
    async () => {
      if (!starRating) {
        throw new Error("Star rating is required");
      }

      if (!userId) {
        throw new Error("User ID not found");
      }

      if (!businessId) {
        throw new Error("Business ID not found");
      }

      await client.graphql({
        query: createReviewsMutation,
        variables: {
          input: {
            text,
            businessId,
            userId,
            rating: starRating,
            updatedAt: new Date().getTime(),
          },
        },
      });
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
        setOption("update");

        toast("Successfully created review", {
          autoClose: 3000,
          type: "success",
          position: "bottom-right",
        });
      },
    }
  );

  const editReviewMutation = useMutation(
    async (reviewId: string) => {
      if (!reviewId) {
        throw new Error("Review ID not found");
      }

      if (!starRating) {
        throw new Error("Star rating is required");
      }

      if (!userId) {
        throw new Error("User ID not found");
      }

      if (!businessId) {
        throw new Error("Business ID not found");
      }

      await client.graphql({
        query: updateReviewsMutation,
        variables: {
          input: {
            id: reviewId,
            text,
            businessId,
            userId,
            rating: starRating,
            updatedAt: new Date().getTime(),
          },
        },
      });
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
        toast("Successfully updated review", {
          autoClose: 3000,
          type: "success",
          position: "bottom-right",
        });
      },
    }
  );

  const removeReviewMutation = useMutation(
    async (reviewId: string) => {
      if (!reviewId) {
        throw new Error("Review ID not found");
      }

      await client.graphql({
        query: deleteReviewsMutation,
        variables: {
          input: {
            id: reviewId,
          },
        },
      });
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
        setText("");
        setStarRating(1);
        setOption("create");

        toast("Successfully deleted review", {
          autoClose: 3000,
          type: "success",
          position: "bottom-right",
        });
      },
    }
  );

  return (
    <div className="flex flex-col space-y-4 w-full pdx-2 sm:px-0">
      <h1 className="text-2xl font-semibold">Review</h1>

      {
        // If review exists, show update review, else show create review
        option === "update" ? (
          <div className="flex flex-col w-full space-y-2">
            <Rating
              name="half-rating-read"
              defaultValue={starRating}
              precision={0.5}
              size="large"
              onChange={(event, newValue) => {
                if (newValue) setStarRating(newValue);
              }}
            />

            <Textarea value={text} onChange={(e) => setText(e.target.value)} />

            <div className="space-x-4">
              <ButtonPrimary
                disabled={editReviewMutation.isLoading}
                onClick={() =>
                  editReviewMutation.mutate(
                    (review as individualReviewReturnType).id
                  )
                }
              >
                Update Review
              </ButtonPrimary>

              <ButtonPrimary
                disabled={removeReviewMutation.isLoading}
                onClick={() =>
                  removeReviewMutation.mutate(
                    (review as individualReviewReturnType).id
                  )
                }
                className="bg-red-500 hover:bg-red-600"
              >
                Delete Review
              </ButtonPrimary>
            </div>
          </div>
        ) : (
          <div className="flex flex-col w-full space-y-2">
            <Rating
              name="half-rating-read"
              defaultValue={starRating}
              precision={0.5}
              size="large"
              onChange={(event, newValue) => {
                if (newValue) setStarRating(newValue);
              }}
            />

            <Textarea value={text} onChange={(e) => setText(e.target.value)} />

            <ButtonPrimary
              disabled={addReviewMutation.isLoading}
              onClick={() => addReviewMutation.mutate()}
            >
              Add Review
            </ButtonPrimary>
          </div>
        )
      }
    </div>
  );
}
