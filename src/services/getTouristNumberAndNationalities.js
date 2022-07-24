const API_BASE_URL = "http://localhost:5000";

export async function getTouristNumberAndNationalities(collectionUrl) {
  try {
    const response = await fetch(`${API_BASE_URL}${collectionUrl}`);
    const data = await response.json();
    console.log("Raiz", data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
