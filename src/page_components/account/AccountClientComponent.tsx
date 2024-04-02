"use client";

import React, { useEffect, useState } from "react";
import Label from "@/components/Label/Label";
import Avatar from "@/shared/Avatar/Avatar";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import Textarea from "@/shared/Textarea/Textarea";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { Account, UserProfile } from "@/API";
import { useProfilePictureContext } from "@/context/profilePicture/ProfilePictureContext";
import { uploadData, getUrl, remove } from "aws-amplify/storage";
import { useMutation } from "react-query";
import { GraphQLResult, generateClient } from "aws-amplify/api";
import { updateUserProfile as updateUserProfileMutation } from "@/graphql/mutations";
import { toast } from "react-toastify";
import { set } from "lodash";

const client = generateClient();

interface AccountClientComponentProps {
  userProfile: UserProfile | undefined;
  userId: string | undefined;
}

export default function AccountClientComponent({
  userProfile,
  userId,
}: AccountClientComponentProps) {
  const {
    imageUrl,
    setImageUrl,
    createdAt,
    setCreatedAt,
    fileName,
    setFileName,
    setFirstNameContext,
    setLastNameContext,
  } = useProfilePictureContext();

  useEffect(() => {
    if (userProfile?.profilePicture) {
      setImageUrl(userProfile.profilePicture.imageUrl);
      setCreatedAt(userProfile.profilePicture.createdAt);
      setFileName(userProfile.profilePicture.fileName);
    }
  }, []);

  const imageMutation = useMutation(
    async ({ file, userId }: { userId: string; file: File }) => {
      const key = `${userId}/profilePicture/${file.name}`;

      // deletes old profile picture if there is one
      if (fileName) {
        const key = `${userId}/profilePicture/${fileName}`;

        await client.graphql({
          query: updateUserProfileMutation,
          variables: {
            input: {
              id: userProfile!.id,
              profilePicture: null,
            },
          },
        });

        await remove({
          key,
        });
      }

      await uploadData({
        key,
        data: file,
      }).result;
      const imageUrl = await getUrl({ key });

      const createdAt = new Date().getTime();

      const profilePicture = {
        imageUrl: imageUrl.url.href,
        createdAt,
        fileName: file.name,
      };

      if (imageUrl) {
        await client.graphql({
          query: updateUserProfileMutation,
          variables: {
            input: {
              id: userProfile!.id,
              profilePicture,
            },
          },
        });
      } else {
        throw new Error("Error uploading image");
      }

      return profilePicture;
    },
    {
      onError: (err: Error) => {
        toast(err.message, {
          autoClose: 3000,
          type: "error",
          position: "bottom-right",
        });
      },
      onSuccess: ({ createdAt, fileName, imageUrl }) => {
        toast(`Successfully updated profile picture to ${fileName}!`, {
          autoClose: 7000,
          type: "success",
          position: "bottom-right",
        });

        setImageUrl(imageUrl);
        setCreatedAt(createdAt);
        setFileName(fileName);
      },
    }
  );

  const mutation = useMutation(
    async () => {
      if (!userProfile?.id) {
        throw new Error("Error fetching user account");
      }

      await client.graphql({
        query: updateUserProfileMutation,
        variables: {
          input: {
            id: userProfile!.id,
            firstName,
            lastName,
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
        setFirstNameContext(firstName);
        setLastNameContext(lastName);

        toast("Successfully updated profile!", {
          autoClose: 5000,
          type: "success",
          position: "bottom-right",
        });
      },
    }
  );

  const [firstName, setFirstName] = useState(
    userProfile?.firstName ? userProfile.firstName : ""
  );
  const [lastName, setLastName] = useState(
    userProfile?.lastName ? userProfile.lastName : ""
  );

  function handleSubmit() {
    if (!firstName) {
      toast("First name is required", {
        autoClose: 3000,
        type: "error",
        position: "bottom-right",
      });
      return;
    }

    if (!lastName) {
      toast("Last name is required", {
        autoClose: 3000,
        type: "error",
        position: "bottom-right",
      });
      return;
    }

    mutation.mutate();
  }

  return (
    <div className={`nc-AccountClientComponent`}>
      <div className="container">
        <div className="my-12 sm:lg:my-16 lg:my-24 max-w-4xl mx-auto space-y-8 sm:space-y-10">
          {/* HEADING */}
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-semibold">
              Profile settings
            </h2>
            <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
              You can set preferred display name, create your profile URL and
              manage other personal settings.
            </span>
          </div>
          <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>
          <div className="flex flex-col md:flex-row">
            <div className="flex-shrink-0 flex items-start">
              <div className="relative rounded-full overflow-hidden flex">
                <Avatar sizeClass="w-32 h-32" imgUrl={imageUrl} />
                <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-neutral-50 cursor-pointer">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <span className="mt-1 text-xs">Change Image</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => {
                    if (e.target.files) {
                      const file = e.target.files[0];
                      imageMutation.mutate({ file, userId: userId! });
                    }
                  }}
                />
              </div>
            </div>
            <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-5 sm:space-y-6 md:sm:space-y-7">
              {/* ---- */}
              <div>
                <Label>First Name</Label>
                <Input
                  className="mt-1.5"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              {/* ---- */}
              <div>
                <Label>Last Name</Label>
                <Input
                  className="mt-1.5"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              {/* ---- */}
              <div className="pt-2">
                <ButtonPrimary
                  disabled={mutation.isLoading}
                  className="w-full"
                  onClick={handleSubmit}
                >
                  Update profile
                </ButtonPrimary>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
