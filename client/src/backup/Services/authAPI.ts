import axiosInstance from "./axiosInstance";

export interface UserProfileToken {
  token: string;
  username: string;
  // Add other properties as per your API response
}

export const loginAPI = async (
  username: string,
  password: string
): Promise<UserProfileToken | null> => {
  try {
    const response = await axiosInstance.post<UserProfileToken>("account/login", {
      username,
      password,
    });
    return response.data; // Successfully logged in
  } catch (error: any) {
    console.error("Login API error:", error);
    if (error.response) {
      // Handle server errors
      throw new Error(error.response.data.message || "Login failed.");
    } else {
      // Handle network errors
      throw new Error("Network error. Please try again.");
    }
  }
};