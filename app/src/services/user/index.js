import axios from "axios";
import * as urls from "../apiUrls";
import { doRequest } from "utils/request";

const register = async (data) => {
  try {
    return await doRequest(`${urls.REGISTER}`, "POST", data);
  } catch (e) {
    if (axios.isAxiosError(e) && e?.response?.data?.error) {
      return e.response.data;
    } else {
      return { error: { errorCode: 11110, message: "Something went wrong!" } };
    }
  }
};

const login = async (data) => {
  try {
    return await doRequest(`${urls.LOGIN}`, "POST", data);
  } catch (e) {
    if (axios.isAxiosError(e) && e?.response?.data?.error) {
      return e.response.data;
    } else {
      return { error: { errorCode: 11110, message: "Something went wrong!" } };
    }
  }
};

const tokenVerify = async () => {
  try {
    return await doRequest(`${urls.VERIFY}`, "GET");
  } catch (e) {
    if (axios.isAxiosError(e) && e?.response?.data?.error) {
      return e.response.data;
    } else {
      return { error: { errorCode: 11110, message: "Something went wrong!" } };
    }
  }
};

const getUser = async () => {
  try {
    return await doRequest(`${urls.USER}`, "GET");
  } catch (e) {
    if (axios.isAxiosError(e) && e?.response?.data?.error) {
      return e.response.data;
    } else {
      return { error: { errorCode: 11110, message: "Something went wrong!" } };
    }
  }
};

const putUser = async (data) => {
  try {
    return await doRequest(`${urls.USER}`, "PUT", data);
  } catch (e) {
    if (axios.isAxiosError(e) && e?.response?.data?.error) {
      return e.response.data;
    } else {
      return { error: { errorCode: 11110, message: "Something went wrong!" } };
    }
  }
};

const deleteUser = async (data) => {
  try {
    return await doRequest(`${urls.USER}`, "DELETE", data);
  } catch (e) {
    if (axios.isAxiosError(e) && e?.response?.data?.error) {
      return e.response.data;
    } else {
      return { error: { errorCode: 11110, message: "Something went wrong!" } };
    }
  }
};

export { register, login, getUser, putUser, deleteUser, tokenVerify };
