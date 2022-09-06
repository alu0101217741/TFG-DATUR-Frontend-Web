import { touristSpendingWrapper } from "./touristSpendingWrapper";

const API_BASE_URL = "https://www.datur.me";

export async function getDataFromApi(collectionUrl) {
  try {
    const response = await fetch(`${API_BASE_URL}${collectionUrl}`, {
      method: "GET",
      headers: new Headers({
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      }),
    });
    const data = await response.json();

    if (collectionUrl === "/api/v1/touristSpending")
      return touristSpendingWrapper(data);

    return data;
  } catch (error) {
    console.log(error);
  }
}
