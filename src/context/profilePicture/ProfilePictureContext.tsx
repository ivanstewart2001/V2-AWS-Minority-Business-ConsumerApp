import { set } from "lodash";
import React, { createContext, useState, useEffect, useContext } from "react";
import { getCurrentUser } from "@aws-amplify/auth";
import { Hub } from "aws-amplify/utils";

interface ProfilePictureContextElements {
  imageUrl: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  createdAt: number;
  setCreatedAt: React.Dispatch<React.SetStateAction<number>>;
  fileName: string;
  setFileName: React.Dispatch<React.SetStateAction<string>>;
  firstNameContext: string;
  setFirstNameContext: React.Dispatch<React.SetStateAction<string>>;
  lastNameContext: string;
  setLastNameContext: React.Dispatch<React.SetStateAction<string>>;
}

const ProfilePictureContext = createContext<ProfilePictureContextElements>({
  imageUrl: "",
  setImageUrl: () => {},
  createdAt: 0,
  setCreatedAt: () => {},
  fileName: "",
  setFileName: () => {},
  firstNameContext: "",
  setFirstNameContext: () => {},
  lastNameContext: "",
  setLastNameContext: () => {},
});

export function useProfilePictureContext() {
  return useContext(ProfilePictureContext);
}

export const ProfilePictureProvider = ({ children }: any) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [createdAt, setCreatedAt] = useState<number>(0);
  const [fileName, setFileName] = useState<string>("");
  const [firstNameContext, setFirstNameContext] = useState<string>("");
  const [lastNameContext, setLastNameContext] = useState<string>("");

  return (
    <ProfilePictureContext.Provider
      value={{
        imageUrl,
        setImageUrl,
        createdAt,
        setCreatedAt,
        fileName,
        setFileName,
        firstNameContext,
        setFirstNameContext,
        lastNameContext,
        setLastNameContext,
      }}
    >
      {children}
    </ProfilePictureContext.Provider>
  );
};
