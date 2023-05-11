import axios from "axios";

export async function doRequest(url, method = "get", dataOrParams) {
  let headers = {
    Accept: "application/json",
    "Content-type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
  };

  const params = method.toLowerCase() === "get" ? dataOrParams : {};
  const data = method.toLowerCase() !== "get" ? dataOrParams : undefined;
  return (
    await axios({
      url,
      method,
      data,
      params,
      headers,
    })
  ).data;
}
