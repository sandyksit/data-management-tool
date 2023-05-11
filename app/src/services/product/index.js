import axios from "axios";
import * as urls from "../apiUrls";
import { doRequest } from "utils/request";
const getProducts = async (params) => {
  try {
    return await doRequest(`${urls.GET_PRODUCTS}?page=${params.page}&pageSize=${params.pageSize}`, "GET");
  } catch (e) {
    if (axios.isAxiosError(e) && e?.response?.data?.error) {
      return e.response.data;
    } else {
      return { error: { errorCode: 11110, message: "Something went wrong!" } };
    }
  }
};

const generateProducts = async () => {
  try {
    return await doRequest(`${urls.GENERATE_PRODUCTS}`, "GET");
  } catch (e) {
    if (axios.isAxiosError(e) && e?.response?.data?.error) {
      return e.response.data;
    } else {
      return { error: { message: "Something went wrong!" } };
    }
  }
};

const filteredProducts = async () => {
  try {
    return await doRequest(`${urls.FILTERED_PRODUCTS}`, "GET");
  } catch (e) {
    if (axios.isAxiosError(e) && e?.response?.data?.error) {
      return e.response.data;
    } else {
      console.log("e?.response", e)
      return { error: { message: "Something went wrong!" } };
    }
  }
};

export { getProducts, generateProducts, filteredProducts };
