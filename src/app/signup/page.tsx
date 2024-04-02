"use client";

import React, { FC, useEffect, useState } from "react";
import facebookSvg from "@/images/Facebook.svg";
import twitterSvg from "@/images/Twitter.svg";
import googleSvg from "@/images/Google.svg";
import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Image from "next/image";
import Link from "next/link";
import Checkbox from "@/shared/Checkbox/Checkbox";
import { toast } from "react-toastify";
import {
  SignupProvider,
  useSignupContext,
} from "@/context/Forms/signUpContext";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import { signUp } from "@aws-amplify/auth";
import { GraphQLResult, generateClient } from "aws-amplify/api";
import {
  createAccount as createAccountMutation,
  createUserProfile as createUserProfileMutation,
} from "../../graphql/mutations";
import { AccountType } from "@/API";

const client = generateClient();

function First() {
  const { page, setPage, email, setEmail, password, setPassword } =
    useSignupContext();

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit() {
    if (!email) {
      toast("Email is required", {
        autoClose: 3000,
        type: "error",
        position: "bottom-right",
      });

      return;
    }

    if (!password) {
      toast("Password is required", {
        autoClose: 3000,
        type: "error",
        position: "bottom-right",
      });

      return;
    }

    if (!confirmPassword) {
      toast("Confirm password is required", {
        autoClose: 3000,
        type: "error",
        position: "bottom-right",
      });

      return;
    }

    if (password !== confirmPassword) {
      toast("Passwords must match", {
        autoClose: 3000,
        type: "error",
        position: "bottom-right",
      });

      return;
    }

    setPage("SECOND");
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      <label className="block">
        <span className="text-neutral-800 dark:text-neutral-200">
          Email address
        </span>
        <Input
          type="email"
          placeholder="example@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1"
        />
      </label>

      <label className="block">
        <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
          Password
        </span>
        <Input
          type={showPassword ? "text" : "password"}
          className="mt-1"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      <label className="block">
        <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
          Confirm Password
        </span>
        <Input
          type={showPassword ? "text" : "password"}
          className="mt-1"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </label>

      <Checkbox
        name="showPassword"
        label="Show Password"
        defaultChecked={showPassword}
        sizeClassName="w-5 h-5"
        labelClassName="text-sm font-normal"
        onChange={(checked) => setShowPassword(checked)}
      />

      <ButtonPrimary onClick={handleSubmit}>Next</ButtonPrimary>
    </div>
  );
}

function Second() {
  const { firstName, setFirstName, lastName, setLastName, email, password } =
    useSignupContext();

  const router = useRouter();

  let unsubscribe = toast.onChange(() => {});

  useEffect(() => {
    return () => {
      unsubscribe();
    };
  }, []);

  const mutation = useMutation(
    async () => {
      const newUser = await signUp({
        // I know its confusing but for some reason even though its
        // an email cognito wants to call it username here
        // I know this is true because the first time I tried putting
        // the actual username here and it said it wanted an email
        username: email,
        password: password,
        options: {
          userAttributes: {
            email: email,
            family_name: lastName,
            name: firstName,
          },
        },
      });

      const userProfileResult = await client.graphql({
        query: createUserProfileMutation,
        variables: {
          input: {
            id: newUser.userId,
            firstName: firstName,
            lastName: lastName,
          },
        },
      });

      const userProfileId = ((userProfileResult as GraphQLResult).data as any)
        .createUserProfile.id;

      await client.graphql({
        query: createAccountMutation,
        variables: {
          input: {
            id: newUser.userId,
            accountType: AccountType.CUSTOMER,
            email: email,
            accountUserProfileId: userProfileId,
          },
        },
      });

      return email;
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
        const successMessage =
          "Successfully created account! Please check your email for your verification code.";

        toast(successMessage, {
          autoClose: 5000,
          type: "success",
          position: "bottom-right",
        });

        unsubscribe = toast.onChange((payload) => {
          if (
            payload.status === "removed" &&
            payload.type === "success" &&
            payload.content === successMessage
          ) {
            // data is the email we
            // returned from the mutation function above
            router.push(`/confirmNewUser/${data}`);
          }
        });
      },
    }
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
    <div className="grid grid-cols-1 gap-6">
      <label className="block">
        <span className="text-neutral-800 dark:text-neutral-200">
          First Name
        </span>
        <Input
          type="text"
          className="mt-1"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </label>

      <label className="block">
        <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
          Last Name
        </span>
        <Input
          type="text"
          className="mt-1"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </label>

      <ButtonPrimary onClick={handleSubmit}>Sign Up</ButtonPrimary>
    </div>
  );
}

function CurrentSignUpPage() {
  const { page } = useSignupContext();

  if (page === "FIRST") {
    return <First />;
  } else if (page === "SECOND") {
    return <Second />;
  }

  return <div></div>;
}

const SignUp = () => {
  return (
    <div className={`nc-PageSignUp `} data-nc-id="PageSignUp">
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Signup
        </h2>
        <div className="max-w-md mx-auto space-y-6 ">
          <CurrentSignUpPage />

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Already have an account? {` `}
            <Link className="text-green-600" href="/login">
              Sign in
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

function SignUpPage() {
  return (
    <SignupProvider>
      <SignUp />
    </SignupProvider>
  );
}

export default SignUpPage;
