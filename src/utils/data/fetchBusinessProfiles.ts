import { getStartUrl } from "./environment";

export interface individualBusinessProfileReturnType {
  id: string;
  state: string;
  name: string;
  liked: boolean;
  profilePictureUrl?: string;
  description?: string;
  address?: string;
  website?: string;
  operatingHours?: Array<{
    dayOfWeek: string;
    opens: string;
    closes: string;
  }>;
  contactInfo?: {
    email: string;
    phoneNumber: string;
  };
  tags?: Array<string>;
  album?: Array<string>;
}

export async function fetchBusinessProfiles(params: {
  userId: string;
  tags?: string[];
  businessStates?: string[];
}) {
  try {
    const START_URL = getStartUrl();

    const axios = (await require("axios")).default;

    const options = {
      method: "POST",
      url: `${START_URL}/fetchBusinessProfiles`,
      data: params,
    };

    const response = await axios.request(options);
    const businessProfiles = response.data;

    return businessProfiles as Array<individualBusinessProfileReturnType>;
  } catch (error) {
    return [];
  }
}
