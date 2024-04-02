/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateAccount = /* GraphQL */ `subscription OnCreateAccount($filter: ModelSubscriptionAccountFilterInput) {
  onCreateAccount(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateAccountSubscriptionVariables,
  APITypes.OnCreateAccountSubscription
>;
export const onUpdateAccount = /* GraphQL */ `subscription OnUpdateAccount($filter: ModelSubscriptionAccountFilterInput) {
  onUpdateAccount(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateAccountSubscriptionVariables,
  APITypes.OnUpdateAccountSubscription
>;
export const onDeleteAccount = /* GraphQL */ `subscription OnDeleteAccount($filter: ModelSubscriptionAccountFilterInput) {
  onDeleteAccount(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteAccountSubscriptionVariables,
  APITypes.OnDeleteAccountSubscription
>;
export const onCreateUserProfile = /* GraphQL */ `subscription OnCreateUserProfile(
  $filter: ModelSubscriptionUserProfileFilterInput
) {
  onCreateUserProfile(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateUserProfileSubscriptionVariables,
  APITypes.OnCreateUserProfileSubscription
>;
export const onUpdateUserProfile = /* GraphQL */ `subscription OnUpdateUserProfile(
  $filter: ModelSubscriptionUserProfileFilterInput
) {
  onUpdateUserProfile(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateUserProfileSubscriptionVariables,
  APITypes.OnUpdateUserProfileSubscription
>;
export const onDeleteUserProfile = /* GraphQL */ `subscription OnDeleteUserProfile(
  $filter: ModelSubscriptionUserProfileFilterInput
) {
  onDeleteUserProfile(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteUserProfileSubscriptionVariables,
  APITypes.OnDeleteUserProfileSubscription
>;
export const onCreateReviews = /* GraphQL */ `subscription OnCreateReviews($filter: ModelSubscriptionReviewsFilterInput) {
  onCreateReviews(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateReviewsSubscriptionVariables,
  APITypes.OnCreateReviewsSubscription
>;
export const onUpdateReviews = /* GraphQL */ `subscription OnUpdateReviews($filter: ModelSubscriptionReviewsFilterInput) {
  onUpdateReviews(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateReviewsSubscriptionVariables,
  APITypes.OnUpdateReviewsSubscription
>;
export const onDeleteReviews = /* GraphQL */ `subscription OnDeleteReviews($filter: ModelSubscriptionReviewsFilterInput) {
  onDeleteReviews(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteReviewsSubscriptionVariables,
  APITypes.OnDeleteReviewsSubscription
>;
