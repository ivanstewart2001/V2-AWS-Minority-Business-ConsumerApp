"use client";

import React, { useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { GraphQLResult, generateClient } from "aws-amplify/api";
import { getUserProfile as getUserProfileMutation } from "@/graphql/queries";
import { updateUserProfile as updateUserProfileMutation } from "@/graphql/mutations";

const client = generateClient();

interface InterestsClientComponentProps {
  userId: string;
  interestTags: string[];
}

export default function InterestsClientComponent({
  userId,
  interestTags,
}: InterestsClientComponentProps) {
  const [interests, setInterests] = useState<string[]>(interestTags);
  const [input, setInput] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const addInterestToUserMutation = useMutation(
    async (interest: string) => {
      if (!userId) {
        throw new Error("User ID not found");
      }

      if (!interest) {
        throw new Error("No interest provided");
      }

      if (interests.includes(input)) {
        throw new Error("Duplicate interest not allowed");
      }

      const user = await client.graphql({
        query: getUserProfileMutation,
        variables: {
          id: userId,
        },
      });

      const currentInterestTags = user.data.getUserProfile?.interestTags || [];

      await client.graphql({
        query: updateUserProfileMutation,
        variables: {
          input: {
            id: userId,
            interestTags: [...currentInterestTags, interest],
          },
        },
      });

      const updatedUser = await client.graphql({
        query: getUserProfileMutation,
        variables: {
          id: userId,
        },
      });

      return updatedUser.data.getUserProfile?.interestTags;
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
        setInterests(data || []);

        toast("Interest tag successfully added", {
          autoClose: 3000,
          type: "success",
          position: "bottom-right",
        });
      },
    }
  );

  const updateInterestOnUserMutation = useMutation(
    async ({
      newInterest,
      oldInterest,
    }: {
      oldInterest: string;
      newInterest: string;
    }) => {
      if (!userId) {
        throw new Error("User ID not found");
      }

      if (!oldInterest || !newInterest) {
        throw new Error("No interest provided");
      }

      if (interests.includes(input)) {
        throw new Error("Duplicate interest not allowed");
      }

      const user = await client.graphql({
        query: getUserProfileMutation,
        variables: {
          id: userId,
        },
      });

      const currentInterestTags = user.data.getUserProfile?.interestTags || [];
      const interestTagsWithoutOldInterest = currentInterestTags.filter(
        (tag) => tag !== oldInterest
      );
      const updatedInterestTags = [
        ...interestTagsWithoutOldInterest,
        newInterest,
      ];

      await client.graphql({
        query: updateUserProfileMutation,
        variables: {
          input: {
            id: userId,
            interestTags: updatedInterestTags,
          },
        },
      });

      const updatedUser = await client.graphql({
        query: getUserProfileMutation,
        variables: {
          id: userId,
        },
      });

      return updatedUser.data.getUserProfile?.interestTags;
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
        setInterests(data || []);

        toast("Interest tag updated added", {
          autoClose: 3000,
          type: "success",
          position: "bottom-right",
        });
      },
    }
  );

  const deleteInterestOnUserMutation = useMutation(
    async (interest: string) => {
      if (!userId) {
        throw new Error("User ID not found");
      }

      if (!interest) {
        throw new Error("No interest provided");
      }

      if (interests.includes(input)) {
        throw new Error("Duplicate interest not allowed");
      }

      const user = await client.graphql({
        query: getUserProfileMutation,
        variables: {
          id: userId,
        },
      });

      const currentInterestTags = user.data.getUserProfile?.interestTags || [];
      const interestTagsWithoutOldInterest = currentInterestTags.filter(
        (tag) => tag !== interest
      );

      await client.graphql({
        query: updateUserProfileMutation,
        variables: {
          input: {
            id: userId,
            interestTags: interestTagsWithoutOldInterest,
          },
        },
      });

      const updatedUser = await client.graphql({
        query: getUserProfileMutation,
        variables: {
          id: userId,
        },
      });

      return updatedUser.data.getUserProfile?.interestTags;
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
        setInterests(data || []);

        toast("Interest tag deleted added", {
          autoClose: 3000,
          type: "success",
          position: "bottom-right",
        });
      },
    }
  );

  const addInterest = (interest: string) => {
    if (!interests.includes(interest)) {
      addInterestToUserMutation.mutate(interest);
    } else {
      toast("Duplicate interest not allowed", {
        autoClose: 3000,
        type: "error",
        position: "bottom-right",
      });
    }
  };

  const editInterest = (index: number, newInterest: string) => {
    const oldInterest = interests[index];
    updateInterestOnUserMutation.mutate({ oldInterest, newInterest });
  };

  const deleteInterest = (index: number) => {
    deleteInterestOnUserMutation.mutate(interests[index]);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleAddInterest = () => {
    if (!isEditing) {
      addInterest(input);
    } else {
      if (editIndex !== null) {
        editInterest(editIndex, input);
      }
      setIsEditing(false);
      setEditIndex(null);
    }
    setInput("");
  };

  const handleEditInterest = (index: number) => {
    setInput(interests[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

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
                  {"My Interests"}
                </h2>
                <span className="block mt-4 text-sm text-neutral-500 dark:text-neutral-400">
                  Add tags of your interests and we'll connect you with matching
                  minority-owned businesses. From food to fashion to tech,
                  there's something for everyone. Start tagging and discover
                  diversity in business!
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ====================== END HEADER ====================== */}

      <div className="container p-5 space-y-4">
        <div className="space-x-4">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add your interest"
          />
          <button
            onClick={handleAddInterest}
            className={`p-2 ${
              !input ||
              addInterestToUserMutation.isLoading ||
              updateInterestOnUserMutation.isLoading
                ? "bg-gray-400"
                : "bg-blue-500 hover:bg-blue-600"
            }  text-white rounded-md `}
            disabled={
              !input ||
              addInterestToUserMutation.isLoading ||
              updateInterestOnUserMutation.isLoading
            }
          >
            {isEditing ? "Update Interest" : "Add Interest"}
          </button>
        </div>
        <div className="flex flex-wrap">
          {interests.map((interest, index) => (
            <div
              key={index}
              className="m-2 bg-blue-200 rounded-full px-4 py-2 flex items-center space-x-2 cursor-pointer"
              onClick={() => handleEditInterest(index)}
            >
              <span>{interest}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteInterest(index);
                }}
                className="bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center hover:bg-red-600"
              >
                x
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
