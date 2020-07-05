import * as Interceptor from "./interceptor";

export const getMainCategoryList = () => {
  const apiUrl = "/get-category-api";
  return Interceptor.get(apiUrl);
};

export const getAllSubCategoryList = () => {
  const apiUrl = "/get-sub-category-api";
  return Interceptor.get(apiUrl);
};

export const getSubCategoryList = id => {
  const apiUrl = `/get-sub-category-api/${id}`;
  return Interceptor.get(apiUrl);
};
export const getAllProductList = () => {
  const apiUrl = "/get-product-api";
  return Interceptor.get(apiUrl);
};

export const getProductDetails = id => {
  const apiUrl = `/get-product-details-api/${id}`;
  return Interceptor.get(apiUrl);
};

export const getProductList = id => {
  const apiUrl = `/get-product-api/${id}`;
  return Interceptor.get(apiUrl);
};

export const submitLoginData = data => {
  const apiUrl = `/login-api/`;
  return Interceptor.post(apiUrl, data);
};

export const getUserProfile = id => {
  const apiUrl = `/get-users-profile-api/${id}`;
  return Interceptor.get(apiUrl);
};

export const submitSignUpData = data => {
  const apiUrl = `/signup-api`;
  return Interceptor.post(apiUrl, data);
};

export const editProfile = data => {
  const apiUrl = "/update-profile-api";
  return Interceptor.post(apiUrl, data);
};

export const changePassword = data => {
  const apiUrl = "/change-password-api";
  return Interceptor.post(apiUrl, data);
};

export const confirmOrder = data => {
  const apiUrl = "/confirm-order-api";
  return Interceptor.post(apiUrl, data);
};
export const forgotPassword = data => {
  const apiUrl = "/forgot-password-api";
  return Interceptor.post(apiUrl, data);
};

export const submitFeedback = data => {
  const apiUrl = "/add-feedback-api";
  return Interceptor.post(apiUrl, data);
};

export const addToCart = data => {
  const apiUrl = "/add-cart-api";
  return Interceptor.post(apiUrl, data);
};

export const getCart = id => {
  const apiUrl = `/get-cart-api/${id}`;
  return Interceptor.get(apiUrl);
};

export const viewOrder = id => {
  const apiUrl = `/get-order-master-api/${id}`;
  return Interceptor.get(apiUrl);
};