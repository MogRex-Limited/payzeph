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

const handleResponse = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  } else {
    throw new Error(`Request failed with status ${response.status}`);
  }
};

const generateWallet = async (token, params) => {
  try {
    const url = `${BASE_URL}/user/wallets/create`;
    const response = await axios.post(url, params, axiosConfig(token));

    return handleResponse(response);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

const fundWallet = async (params) => {
  try {
    const url = `${BASE_URL}/user/wallets/fund-wallet`;
    const response = await axios.post(url, params, axiosConfig());

    return handleResponse(response);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

const getCurrencies = async (token) => {
  try {
    const url = `${BASE_URL}/user/currencies`;
    const response = await axios.get(url, axiosConfig(token));

    return handleResponse(response);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

const getWallets = async (token) => {
  try {
    const url = `${BASE_URL}/user/wallets`;
    const response = await axios.get(url, axiosConfig(token));

    return handleResponse(response);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
const generateAccount = async (token, params) => {
  try {
    const url = `${BASE_URL}/user/account/generate-dynamic-account`;
    const response = await axios.post(url, params, axiosConfig(token));

    return handleResponse(response);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

const WalletFxns = {
  generateWallet,
  fundWallet,
  getCurrencies,
  getWallets,
  generateAccount,
};
export default WalletFxns;
