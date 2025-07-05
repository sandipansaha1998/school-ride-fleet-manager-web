import apiClient from "./client";

export const getRequest = async (url: string, params?: any) => {
  try {
    const response = await apiClient.get(url, { params });
    return response.data;
  } catch (error) {
    console.error("GET request failed:", error);
    throw error;
  }
};
export const postRequest = async (url: string, data: any) => {
  const response = await apiClient.post(url, data);
  return response.data;
};
