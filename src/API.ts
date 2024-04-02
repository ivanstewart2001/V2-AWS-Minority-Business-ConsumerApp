/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateAccountInput = {
  id?: string | null,
  accountType: AccountType,
  email: string,
  accountUserProfileId?: string | null,
};

export enum AccountType {
  CUSTOMER = "CUSTOMER",
  OWNER = "OWNER",
}


export type ModelAccountConditionInput = {
  accountType?: ModelAccountTypeInput | null,
  email?: ModelStringInput | null,
  and?: Array< ModelAccountConditionInput | null > | null,
  or?: Array< ModelAccountConditionInput | null > | null,
  not?: ModelAccountConditionInput | null,
  accountUserProfileId?: ModelIDInput | null,
};

export type ModelAccountTypeInput = {
  eq?: AccountType | null,
  ne?: AccountType | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type Account = {
  __typename: "Account",
  id: string,
  accountType: AccountType,
  email: string,
  userProfile?: UserProfile | null,
  createdAt: string,
  updatedAt: string,
  accountUserProfileId?: string | null,
};

export type UserProfile = {
  __typename: "UserProfile",
  id: string,
  firstName: string,
  lastName: string,
  profilePicture?: ProfilePicture | null,
  likedBusinesses?: Array< string > | null,
  interestTags?: Array< string > | null,
  createdAt: string,
  updatedAt: string,
};

export type ProfilePicture = {
  __typename: "ProfilePicture",
  fileName: string,
  createdAt: number,
  imageUrl: string,
};

export type UpdateAccountInput = {
  id: string,
  accountType?: AccountType | null,
  email?: string | null,
  accountUserProfileId?: string | null,
};

export type DeleteAccountInput = {
  id: string,
};

export type CreateUserProfileInput = {
  id?: string | null,
  firstName: string,
  lastName: string,
  profilePicture?: ProfilePictureInput | null,
  likedBusinesses?: Array< string > | null,
  interestTags?: Array< string > | null,
};

export type ProfilePictureInput = {
  fileName: string,
  createdAt: number,
  imageUrl: string,
};

export type ModelUserProfileConditionInput = {
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  likedBusinesses?: ModelStringInput | null,
  interestTags?: ModelStringInput | null,
  and?: Array< ModelUserProfileConditionInput | null > | null,
  or?: Array< ModelUserProfileConditionInput | null > | null,
  not?: ModelUserProfileConditionInput | null,
};

export type UpdateUserProfileInput = {
  id: string,
  firstName?: string | null,
  lastName?: string | null,
  profilePicture?: ProfilePictureInput | null,
  likedBusinesses?: Array< string > | null,
  interestTags?: Array< string > | null,
};

export type DeleteUserProfileInput = {
  id: string,
};

export type CreateReviewsInput = {
  id?: string | null,
  rating: number,
  businessId: string,
  userId: string,
  text?: string | null,
  updatedAt: number,
};

export type ModelReviewsConditionInput = {
  rating?: ModelFloatInput | null,
  businessId?: ModelStringInput | null,
  userId?: ModelStringInput | null,
  text?: ModelStringInput | null,
  updatedAt?: ModelFloatInput | null,
  and?: Array< ModelReviewsConditionInput | null > | null,
  or?: Array< ModelReviewsConditionInput | null > | null,
  not?: ModelReviewsConditionInput | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Reviews = {
  __typename: "Reviews",
  id: string,
  rating: number,
  businessId: string,
  userId: string,
  text?: string | null,
  updatedAt: number,
  createdAt: string,
};

export type UpdateReviewsInput = {
  id: string,
  rating?: number | null,
  businessId?: string | null,
  userId?: string | null,
  text?: string | null,
  updatedAt?: number | null,
};

export type DeleteReviewsInput = {
  id: string,
};

export type ModelAccountFilterInput = {
  id?: ModelIDInput | null,
  accountType?: ModelAccountTypeInput | null,
  email?: ModelStringInput | null,
  and?: Array< ModelAccountFilterInput | null > | null,
  or?: Array< ModelAccountFilterInput | null > | null,
  not?: ModelAccountFilterInput | null,
  accountUserProfileId?: ModelIDInput | null,
};

export type ModelAccountConnection = {
  __typename: "ModelAccountConnection",
  items:  Array<Account | null >,
  nextToken?: string | null,
};

export type ModelUserProfileFilterInput = {
  id?: ModelIDInput | null,
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  likedBusinesses?: ModelStringInput | null,
  interestTags?: ModelStringInput | null,
  and?: Array< ModelUserProfileFilterInput | null > | null,
  or?: Array< ModelUserProfileFilterInput | null > | null,
  not?: ModelUserProfileFilterInput | null,
};

export type ModelUserProfileConnection = {
  __typename: "ModelUserProfileConnection",
  items:  Array<UserProfile | null >,
  nextToken?: string | null,
};

export type ModelReviewsFilterInput = {
  id?: ModelIDInput | null,
  rating?: ModelFloatInput | null,
  businessId?: ModelStringInput | null,
  userId?: ModelStringInput | null,
  text?: ModelStringInput | null,
  updatedAt?: ModelFloatInput | null,
  and?: Array< ModelReviewsFilterInput | null > | null,
  or?: Array< ModelReviewsFilterInput | null > | null,
  not?: ModelReviewsFilterInput | null,
};

export type ModelReviewsConnection = {
  __typename: "ModelReviewsConnection",
  items:  Array<Reviews | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionAccountFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  accountType?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionAccountFilterInput | null > | null,
  or?: Array< ModelSubscriptionAccountFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionUserProfileFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  firstName?: ModelSubscriptionStringInput | null,
  lastName?: ModelSubscriptionStringInput | null,
  likedBusinesses?: ModelSubscriptionStringInput | null,
  interestTags?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserProfileFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserProfileFilterInput | null > | null,
};

export type ModelSubscriptionReviewsFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  rating?: ModelSubscriptionFloatInput | null,
  businessId?: ModelSubscriptionStringInput | null,
  userId?: ModelSubscriptionStringInput | null,
  text?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionFloatInput | null,
  and?: Array< ModelSubscriptionReviewsFilterInput | null > | null,
  or?: Array< ModelSubscriptionReviewsFilterInput | null > | null,
};

export type ModelSubscriptionFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type CreateAccountMutationVariables = {
  input: CreateAccountInput,
  condition?: ModelAccountConditionInput | null,
};

export type CreateAccountMutation = {
  createAccount?:  {
    __typename: "Account",
    id: string,
    accountType: AccountType,
    email: string,
    userProfile?:  {
      __typename: "UserProfile",
      id: string,
      firstName: string,
      lastName: string,
      likedBusinesses?: Array< string > | null,
      interestTags?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    accountUserProfileId?: string | null,
  } | null,
};

export type UpdateAccountMutationVariables = {
  input: UpdateAccountInput,
  condition?: ModelAccountConditionInput | null,
};

export type UpdateAccountMutation = {
  updateAccount?:  {
    __typename: "Account",
    id: string,
    accountType: AccountType,
    email: string,
    userProfile?:  {
      __typename: "UserProfile",
      id: string,
      firstName: string,
      lastName: string,
      likedBusinesses?: Array< string > | null,
      interestTags?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    accountUserProfileId?: string | null,
  } | null,
};

export type DeleteAccountMutationVariables = {
  input: DeleteAccountInput,
  condition?: ModelAccountConditionInput | null,
};

export type DeleteAccountMutation = {
  deleteAccount?:  {
    __typename: "Account",
    id: string,
    accountType: AccountType,
    email: string,
    userProfile?:  {
      __typename: "UserProfile",
      id: string,
      firstName: string,
      lastName: string,
      likedBusinesses?: Array< string > | null,
      interestTags?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    accountUserProfileId?: string | null,
  } | null,
};

export type CreateUserProfileMutationVariables = {
  input: CreateUserProfileInput,
  condition?: ModelUserProfileConditionInput | null,
};

export type CreateUserProfileMutation = {
  createUserProfile?:  {
    __typename: "UserProfile",
    id: string,
    firstName: string,
    lastName: string,
    profilePicture?:  {
      __typename: "ProfilePicture",
      fileName: string,
      createdAt: number,
      imageUrl: string,
    } | null,
    likedBusinesses?: Array< string > | null,
    interestTags?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserProfileMutationVariables = {
  input: UpdateUserProfileInput,
  condition?: ModelUserProfileConditionInput | null,
};

export type UpdateUserProfileMutation = {
  updateUserProfile?:  {
    __typename: "UserProfile",
    id: string,
    firstName: string,
    lastName: string,
    profilePicture?:  {
      __typename: "ProfilePicture",
      fileName: string,
      createdAt: number,
      imageUrl: string,
    } | null,
    likedBusinesses?: Array< string > | null,
    interestTags?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserProfileMutationVariables = {
  input: DeleteUserProfileInput,
  condition?: ModelUserProfileConditionInput | null,
};

export type DeleteUserProfileMutation = {
  deleteUserProfile?:  {
    __typename: "UserProfile",
    id: string,
    firstName: string,
    lastName: string,
    profilePicture?:  {
      __typename: "ProfilePicture",
      fileName: string,
      createdAt: number,
      imageUrl: string,
    } | null,
    likedBusinesses?: Array< string > | null,
    interestTags?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateReviewsMutationVariables = {
  input: CreateReviewsInput,
  condition?: ModelReviewsConditionInput | null,
};

export type CreateReviewsMutation = {
  createReviews?:  {
    __typename: "Reviews",
    id: string,
    rating: number,
    businessId: string,
    userId: string,
    text?: string | null,
    updatedAt: number,
    createdAt: string,
  } | null,
};

export type UpdateReviewsMutationVariables = {
  input: UpdateReviewsInput,
  condition?: ModelReviewsConditionInput | null,
};

export type UpdateReviewsMutation = {
  updateReviews?:  {
    __typename: "Reviews",
    id: string,
    rating: number,
    businessId: string,
    userId: string,
    text?: string | null,
    updatedAt: number,
    createdAt: string,
  } | null,
};

export type DeleteReviewsMutationVariables = {
  input: DeleteReviewsInput,
  condition?: ModelReviewsConditionInput | null,
};

export type DeleteReviewsMutation = {
  deleteReviews?:  {
    __typename: "Reviews",
    id: string,
    rating: number,
    businessId: string,
    userId: string,
    text?: string | null,
    updatedAt: number,
    createdAt: string,
  } | null,
};

export type GetAccountQueryVariables = {
  id: string,
};

export type GetAccountQuery = {
  getAccount?:  {
    __typename: "Account",
    id: string,
    accountType: AccountType,
    email: string,
    userProfile?:  {
      __typename: "UserProfile",
      id: string,
      firstName: string,
      lastName: string,
      likedBusinesses?: Array< string > | null,
      interestTags?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    accountUserProfileId?: string | null,
  } | null,
};

export type ListAccountsQueryVariables = {
  filter?: ModelAccountFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAccountsQuery = {
  listAccounts?:  {
    __typename: "ModelAccountConnection",
    items:  Array< {
      __typename: "Account",
      id: string,
      accountType: AccountType,
      email: string,
      createdAt: string,
      updatedAt: string,
      accountUserProfileId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserProfileQueryVariables = {
  id: string,
};

export type GetUserProfileQuery = {
  getUserProfile?:  {
    __typename: "UserProfile",
    id: string,
    firstName: string,
    lastName: string,
    profilePicture?:  {
      __typename: "ProfilePicture",
      fileName: string,
      createdAt: number,
      imageUrl: string,
    } | null,
    likedBusinesses?: Array< string > | null,
    interestTags?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUserProfilesQueryVariables = {
  filter?: ModelUserProfileFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserProfilesQuery = {
  listUserProfiles?:  {
    __typename: "ModelUserProfileConnection",
    items:  Array< {
      __typename: "UserProfile",
      id: string,
      firstName: string,
      lastName: string,
      likedBusinesses?: Array< string > | null,
      interestTags?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetReviewsQueryVariables = {
  id: string,
};

export type GetReviewsQuery = {
  getReviews?:  {
    __typename: "Reviews",
    id: string,
    rating: number,
    businessId: string,
    userId: string,
    text?: string | null,
    updatedAt: number,
    createdAt: string,
  } | null,
};

export type ListReviewsQueryVariables = {
  filter?: ModelReviewsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListReviewsQuery = {
  listReviews?:  {
    __typename: "ModelReviewsConnection",
    items:  Array< {
      __typename: "Reviews",
      id: string,
      rating: number,
      businessId: string,
      userId: string,
      text?: string | null,
      updatedAt: number,
      createdAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateAccountSubscriptionVariables = {
  filter?: ModelSubscriptionAccountFilterInput | null,
};

export type OnCreateAccountSubscription = {
  onCreateAccount?:  {
    __typename: "Account",
    id: string,
    accountType: AccountType,
    email: string,
    userProfile?:  {
      __typename: "UserProfile",
      id: string,
      firstName: string,
      lastName: string,
      likedBusinesses?: Array< string > | null,
      interestTags?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    accountUserProfileId?: string | null,
  } | null,
};

export type OnUpdateAccountSubscriptionVariables = {
  filter?: ModelSubscriptionAccountFilterInput | null,
};

export type OnUpdateAccountSubscription = {
  onUpdateAccount?:  {
    __typename: "Account",
    id: string,
    accountType: AccountType,
    email: string,
    userProfile?:  {
      __typename: "UserProfile",
      id: string,
      firstName: string,
      lastName: string,
      likedBusinesses?: Array< string > | null,
      interestTags?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    accountUserProfileId?: string | null,
  } | null,
};

export type OnDeleteAccountSubscriptionVariables = {
  filter?: ModelSubscriptionAccountFilterInput | null,
};

export type OnDeleteAccountSubscription = {
  onDeleteAccount?:  {
    __typename: "Account",
    id: string,
    accountType: AccountType,
    email: string,
    userProfile?:  {
      __typename: "UserProfile",
      id: string,
      firstName: string,
      lastName: string,
      likedBusinesses?: Array< string > | null,
      interestTags?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    accountUserProfileId?: string | null,
  } | null,
};

export type OnCreateUserProfileSubscriptionVariables = {
  filter?: ModelSubscriptionUserProfileFilterInput | null,
};

export type OnCreateUserProfileSubscription = {
  onCreateUserProfile?:  {
    __typename: "UserProfile",
    id: string,
    firstName: string,
    lastName: string,
    profilePicture?:  {
      __typename: "ProfilePicture",
      fileName: string,
      createdAt: number,
      imageUrl: string,
    } | null,
    likedBusinesses?: Array< string > | null,
    interestTags?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserProfileSubscriptionVariables = {
  filter?: ModelSubscriptionUserProfileFilterInput | null,
};

export type OnUpdateUserProfileSubscription = {
  onUpdateUserProfile?:  {
    __typename: "UserProfile",
    id: string,
    firstName: string,
    lastName: string,
    profilePicture?:  {
      __typename: "ProfilePicture",
      fileName: string,
      createdAt: number,
      imageUrl: string,
    } | null,
    likedBusinesses?: Array< string > | null,
    interestTags?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserProfileSubscriptionVariables = {
  filter?: ModelSubscriptionUserProfileFilterInput | null,
};

export type OnDeleteUserProfileSubscription = {
  onDeleteUserProfile?:  {
    __typename: "UserProfile",
    id: string,
    firstName: string,
    lastName: string,
    profilePicture?:  {
      __typename: "ProfilePicture",
      fileName: string,
      createdAt: number,
      imageUrl: string,
    } | null,
    likedBusinesses?: Array< string > | null,
    interestTags?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateReviewsSubscriptionVariables = {
  filter?: ModelSubscriptionReviewsFilterInput | null,
};

export type OnCreateReviewsSubscription = {
  onCreateReviews?:  {
    __typename: "Reviews",
    id: string,
    rating: number,
    businessId: string,
    userId: string,
    text?: string | null,
    updatedAt: number,
    createdAt: string,
  } | null,
};

export type OnUpdateReviewsSubscriptionVariables = {
  filter?: ModelSubscriptionReviewsFilterInput | null,
};

export type OnUpdateReviewsSubscription = {
  onUpdateReviews?:  {
    __typename: "Reviews",
    id: string,
    rating: number,
    businessId: string,
    userId: string,
    text?: string | null,
    updatedAt: number,
    createdAt: string,
  } | null,
};

export type OnDeleteReviewsSubscriptionVariables = {
  filter?: ModelSubscriptionReviewsFilterInput | null,
};

export type OnDeleteReviewsSubscription = {
  onDeleteReviews?:  {
    __typename: "Reviews",
    id: string,
    rating: number,
    businessId: string,
    userId: string,
    text?: string | null,
    updatedAt: number,
    createdAt: string,
  } | null,
};
