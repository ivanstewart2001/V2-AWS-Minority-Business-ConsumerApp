"use client";

import React, { useEffect, useState } from "react";
import { createContext, useContext } from "react";

interface SignupContextElements {
  page: "FIRST" | "SECOND";
  setPage: React.Dispatch<React.SetStateAction<"FIRST" | "SECOND">>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  firstName: string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  lastName: string;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
}

const Context = createContext<SignupContextElements>({
  page: "FIRST",
  setPage: () => {},
  email: "",
  setEmail: () => {},
  password: "",
  setPassword: () => {},
  firstName: "",
  setFirstName: () => {},
  lastName: "",
  setLastName: () => {},
});

export function useSignupContext() {
  return useContext(Context);
}

export function SignupProvider({ children }: { children: any }) {
  const [page, setPage] = useState<"FIRST" | "SECOND">("FIRST");

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  return (
    <Context.Provider
      value={{
        page,
        setPage,
        email,
        setEmail,
        password,
        setPassword,
        firstName,
        setFirstName,
        lastName,
        setLastName,
      }}
    >
      {children}
    </Context.Provider>
  );
}
