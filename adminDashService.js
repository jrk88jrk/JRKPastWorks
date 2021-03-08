import axios from "axios";
import debug from "sabio-debug";

import {
  onGlobalSuccess,
  onGlobalError,
  API_HOST_PREFIX,
} from ".././serviceHelpers";

const endpoint = `${API_HOST_PREFIX}/api/adminDash`;

const _logger = debug.extend("adminDashService");

const getAllUserRoles = (payload) => {
  _logger("...getAllUserRoles is executing....");
  const config = {
    method: "GET",
    url: `${endpoint}/paginate?pageIndex=${payload.pageIndex}&pageSize=${payload.pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
const getUsersByRole = (payload) => {
  _logger("...getUserByRole is executing....");
  const config = {
    method: "GET",
    url: `${endpoint}/rolepaginate?pageIndex=${payload.pageIndex}&pageSize=${payload.pageSize}&role=${payload.role}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const changeUserStatusId = (payload) => {
  _logger("we are editing a user", payload.id);
  const config = {
    method: "PUT",
    url: `${endpoint}/${payload.user.id}`,
    data: payload.user,
    withCredentials: true,
    crossdomanin: true,
    headers: {},
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
const getAllRoles = () => {
  _logger("...getAllUserRoles is executing....");
  const config = {
    method: "GET",
    url: `${endpoint}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
export default {
  getAllUserRoles,
  changeUserStatusId,
  getUsersByRole,
  getAllRoles,
};
