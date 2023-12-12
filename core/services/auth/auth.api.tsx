import { ENV } from "@/config/app.config";

export const login = async (requestData: any) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  };

  try {
    const response = await fetch(
      `${ENV.BASE_URL}` + `auth/generateotp`,
      fetchOptions
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Response data:", data);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
