import { getStartUrl } from "./environment";
import { individualBusinessProfileReturnType } from "./fetchBusinessProfiles";

export async function fetchLikedBusinessProfiles(params: {
  userId: string;
  tags?: string[];
  businessStates?: string[];
}) {
  try {
    const START_URL = getStartUrl();

    const axios = (await require("axios")).default;

    const options = {
      method: "POST",
      url: `${START_URL}/fetchLikedBusinessProfiles`,
      data: params,
    };

    const response = await axios.request(options);
    const businessProfiles = response.data;

    return businessProfiles as Array<individualBusinessProfileReturnType>;
  } catch (error) {
    return [];
  }
}
