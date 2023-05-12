//User api endpoints
export const REGISTER = `${process.env.REACT_APP_API_DOMAIN}/register`;
export const LOGIN = `${process.env.REACT_APP_API_DOMAIN}/login`;
export const VERIFY = `${process.env.REACT_APP_API_DOMAIN}/token`;
export const USER = `${process.env.REACT_APP_API_DOMAIN}/user`;

//product api endpoints
export const GET_PRODUCTS = `${process.env.REACT_APP_API_DOMAIN}/csv`;
export const GENERATE_PRODUCTS = `${process.env.REACT_APP_API_DOMAIN}/generator`;
export const FILTERED_PRODUCTS = `${process.env.REACT_APP_API_DOMAIN}/filtered`;
