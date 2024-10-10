import axios from 'axios';
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const axiosConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
    'api-key': `${API_KEY}`,
    Accept: 'application/json',
  },
});

const axiosConfigJustAPI = () => ({
  headers: {
    'api-key': `${API_KEY}`,
    Accept: 'application/json',
  },
});

const handleResponse = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  } else {
    throw new Error(`Request failed with status ${response.status}`);
  }
};

const registerUser = async (params) => {
  try {
    const url = `${BASE_URL}/user/auth/register`;
    const response = await axios.post(url, params, axiosConfigJustAPI());

    return handleResponse(response);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
const userRequestNewOTP = async (params) => {
  try {
    const url = `${BASE_URL}/user/auth/otp/request`;
    const response = await axios.post(url, params, axiosConfigJustAPI());

    return handleResponse(response);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

const loginUser = async (params) => {
  try {
    const url = `${BASE_URL}/user/auth/login`;
    const response = await axios.post(url, params, axiosConfigJustAPI());

    return handleResponse(response);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

const previewUser = async (params) => {
  try {
    const url = `${BASE_URL}/user/account/preview`;
    const response = await axios.post(url, params, axiosConfigJustAPI());

    return handleResponse(response);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

const logoutUser = async (token) => {
  try {
    const url = `${BASE_URL}/user/auth/logout`;
    const response = await axios.post(url, axiosConfig(token));

    return handleResponse(response);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

const generate2FA = async (token) => {
  try {
    const url = `${BASE_URL}/user/2fa/generate-secret`;
    const response = await axios.get(url, axiosConfig(token));

    return handleResponse(response);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

const verify2FA = async (params, token) => {
  try {
    const url = `${BASE_URL}/user/2fa/enable`;
    const response = await axios.post(url, params, axiosConfig(token));

    return handleResponse(response);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

const disable2FA = async (token) => {
  try {
    const url = `${BASE_URL}/user/2fa/disable`;
    const response = await axios.post(url, axiosConfig(token));

    return handleResponse(response);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

const userForgotPassword = async (params) => {
  try {
    const url = `${BASE_URL}/user/auth/password/forgot`;
    const response = await axios.post(url, params, axiosConfigJustAPI());

    return handleResponse(response);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

const userResetPassword = async (params) => {
  try {
    const url = `${BASE_URL}/user/auth/password/reset`;
    const response = await axios.post(url, params, axiosConfigJustAPI());

    return handleResponse(response);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

const verifyOTP = async (params, token) => {
  try {
    const url = `${BASE_URL}/user/auth/otp/verify`;
    const response = await axios.post(url, params, axiosConfig(token));

    return handleResponse(response);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

const AuthFxns = {
  registerUser,
  loginUser,
  logoutUser,
  userForgotPassword,
  userResetPassword,
  verifyOTP,
  userRequestNewOTP,
  previewUser,
  generate2FA,
  verify2FA,
  disable2FA,
};
export default AuthFxns;
