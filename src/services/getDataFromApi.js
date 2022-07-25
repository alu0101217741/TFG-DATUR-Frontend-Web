import { touristStayWrapper } from "./touristStayWrapper";

const API_BASE_URL = "http://localhost:5000";

export async function getDataFromApi(collectionUrl) {
  try {
    const response = await fetch(`${API_BASE_URL}${collectionUrl}`);
    const data = await response.json();

    if (collectionUrl === "/api/v1/touristSpending")
      return touristStayWrapper(data);

    return data;
  } catch (error) {
    console.log(error);
  }
}
