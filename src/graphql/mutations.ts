/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createAccount = /* GraphQL */ `mutation CreateAccount(
  $input: CreateAccountInput!
  $condition: ModelAccountConditionInput
) {
  createAccount(input: $input, condition: $condition) {
    id
    accountType
    email
    userProfile {
      id
      firstName
      lastName
      likedBusinesses
      interestTags
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    accountUserProfileId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateAccountMutationVariables,
  APITypes.CreateAccountMutation
>;
export const updateAccount = /* GraphQL */ `mutation UpdateAccount(
  $input: UpdateAccountInput!
  $condition: ModelAccountConditionInput
) {
  updateAccount(input: $input, condition: $condition) {
    id
    accountType
    email
    userProfile {
      id
      firstName
      lastName
      likedBusinesses
      interestTags
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    accountUserProfileId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateAccountMutationVariables,
  APITypes.UpdateAccountMutation
>;
export const deleteAccount = /* GraphQL */ `mutation DeleteAccount(
  $input: DeleteAccountInput!
  $condition: ModelAccountConditionInput
) {
  deleteAccount(input: $input, condition: $condition) {
    id
    accountType
    email
    userProfile {
      id
      firstName
      lastName
      likedBusinesses
      interestTags
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    accountUserProfileId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteAccountMutationVariables,
  APITypes.DeleteAccountMutation
>;
export const createUserProfile = /* GraphQL */ `mutation CreateUserProfile(
  $input: CreateUserProfileInput!
  $condition: ModelUserProfileConditionInput
) {
  createUserProfile(input: $input, condition: $condition) {
    id
    firstName
    lastName
    profilePicture {
      fileName
      createdAt
      imageUrl
      __typename
    }
    likedBusinesses
    interestTags
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateUserProfileMutationVariables,
  APITypes.CreateUserProfileMutation
>;
export const updateUserProfile = /* GraphQL */ `mutation UpdateUserProfile(
  $input: UpdateUserProfileInput!
  $condition: ModelUserProfileConditionInput
) {
  updateUserProfile(input: $input, condition: $condition) {
    id
    firstName
    lastName
    profilePicture {
      fileName
      createdAt
      imageUrl
      __typename
    }
    likedBusinesses
    interestTags
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateUserProfileMutationVariables,
  APITypes.UpdateUserProfileMutation
>;
export const deleteUserProfile = /* GraphQL */ `mutation DeleteUserProfile(
  $input: DeleteUserProfileInput!
  $condition: ModelUserProfileConditionInput
) {
  deleteUserProfile(input: $input, condition: $condition) {
    id
    firstName
    lastName
    profilePicture {
      fileName
      createdAt
      imageUrl
      __typename
    }
    likedBusinesses
    interestTags
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteUserProfileMutationVariables,
  APITypes.DeleteUserProfileMutation
>;
export const createReviews = /* GraphQL */ `mutation CreateReviews(
  $input: CreateReviewsInput!
  $condition: ModelReviewsConditionInput
) {
  createReviews(input: $input, condition: $condition) {
    id
    rating
    businessId
    userId
    text
    updatedAt
    createdAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateReviewsMutationVariables,
  APITypes.CreateReviewsMutation
>;
export const updateReviews = /* GraphQL */ `mutation UpdateReviews(
  $input: UpdateReviewsInput!
  $condition: ModelReviewsConditionInput
) {
  updateReviews(input: $input, condition: $condition) {
    id
    rating
    businessId
    userId
    text
    updatedAt
    createdAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateReviewsMutationVariables,
  APITypes.UpdateReviewsMutation
>;
export const deleteReviews = /* GraphQL */ `mutation DeleteReviews(
  $input: DeleteReviewsInput!
  $condition: ModelReviewsConditionInput
) {
  deleteReviews(input: $input, condition: $condition) {
    id
    rating
    businessId
    userId
    text
    updatedAt
    createdAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteReviewsMutationVariables,
  APITypes.DeleteReviewsMutation
>;
