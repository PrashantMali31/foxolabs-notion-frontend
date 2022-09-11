

import * as Types from "./types"
import {config} from "src/config";
import client from "../client";


export const loginRequest = (data) => {
  return async (dispatch) => {
    return dispatch({
      type: Types.LOGIN,
      payload: async () => {
        try {
          const response = await client.post(
            config.AUTH_API_URL,
            data,
          );
          if (response.status === 200) {
            return Promise.resolve(response);
          }
          return Promise.reject(response);
        } catch (error) {
          return Promise.reject(error);
        }
      },
    });
  };
};

export const loginAdminRequest = (data) => {
  return async (dispatch) => {
    return dispatch({
      type: Types.ADMIN_LOGIN,
      payload: async () => {
        try {
          const response = await client.post(
            config.AUTH_ADMIN_LOGIN,
            data,
          );
          if (response.status === 200) {
            return Promise.resolve(response);
          }
          return Promise.reject(response);
        } catch (error) {
          return Promise.reject(error);
        }
      },
    });
  };
};
