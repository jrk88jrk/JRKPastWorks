import axios from "axios";
import debug from "sabio-debug";

import {
  onGlobalSuccess,
  onGlobalError,
  API_HOST_PREFIX,
} from ".././serviceHelpers";

const endpoint = `${API_HOST_PREFIX}/api/TempProviders`;

const _logger = debug.extend("TempProviderService");

const getTempProviders = () => {
  _logger("...getTempProviders is executing....");
  const config = {
    method: "GET",
    url: `${endpoint}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
const verifyProvider = (response) => {
  _logger("...verifyProvider is executing....");
  const config = {
    method: "GET",
    url: `${API_HOST_PREFIX}/api/npiverify/${response.npi}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
const validateProvider = (payload) => {
  _logger("we are editing a user", payload.userId);
  const config = {
    method: "PUT",
    url: `${API_HOST_PREFIX}/api/npiverify/${payload.userId.id}`,
    data: payload.userId,
    withCredentials: true,
    crossdomanin: true,
    headers: {},
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

export default {
  verifyProvider,
  validateProvider,
  getTempProviders,
};
