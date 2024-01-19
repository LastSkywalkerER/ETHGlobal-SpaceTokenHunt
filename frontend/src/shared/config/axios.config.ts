import axiosLib from "axios";

import { baseURL } from "../constants/constants";

export const axios = axiosLib.create({
  baseURL,
  withCredentials: true,
});
