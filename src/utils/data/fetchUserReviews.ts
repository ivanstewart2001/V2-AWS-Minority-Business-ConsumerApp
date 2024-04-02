import { getStartUrl } from "./environment";
import { individualBusinessProfileReturnType } from "./fetchBusinessProfiles";

export interface individualReviewReturnType {
  businessId: string;
  userId: string;
  rating: number;
  text: string;
  updatedAt: number;
  id: string;
}

export async function fetchUserReviews({ userId }: { userId: string }) {
  try {
    const START_URL = getStartUrl();

    const axios = (await require("axios")).default;

    const options = {
      method: "GET",
      url: `${START_URL}/fetchUserReviews/${userId}`,
    };

    const response = await axios.request(options);
    const review = response.data;

    return review as individualReviewReturnType[];
  } catch (error) {
    return [];
  }
}
