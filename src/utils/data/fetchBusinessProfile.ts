import { getStartUrl } from "./environment";
import { individualBusinessProfileReturnType } from "./fetchBusinessProfiles";

export async function fetchBusinessProfile({
  businessId,
  userId,
}: {
  userId: string;
  businessId: string;
}) {
  try {
    const START_URL = getStartUrl();

    const axios = (await require("axios")).default;

    const options = {
      method: "GET",
      url: `${START_URL}/fetchBusinessProfile/${businessId}/${userId}`,
    };

    const response = await axios.request(options);
    const businessProfile = response.data;

    return businessProfile as individualBusinessProfileReturnType;
  } catch (error) {
    return {};
  }
}
