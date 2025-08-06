import apiClient from "./client";

export const getRequest = async ({
  url,
  queryParams,
}: {
  url: string;
  queryParams?: Record<string, any>;
}) => {
  try {
    const response = await apiClient.get(url, {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    console.error("GET request failed:", error);
    ``;
    throw error;
  }
};
export const postRequest = async (url: string, data: any) => {
  const response = await apiClient.post(url, data);
  return response.data;
};
