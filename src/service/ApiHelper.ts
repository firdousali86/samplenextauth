import { create } from "apisauce";
import {
  kApiUrl,
  ERROR_NETWORK_NOT_AVAILABLE,
  ERROR_WRONG_CREDENTIALS,
} from "../config/WebService";

interface ErrorResponse {
  error: {
    code: string;
  };
}

const api = create({
  baseURL: kApiUrl,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

class ApiHelper {
  myobject = undefined;

  get = async (url: string, data: Object, headers: any) => {
    try {
      const response = await api.get(url, data, { headers: headers });

      return new Promise((resolve, reject) => {
        this.handlePromise(resolve, reject, response);
      });
    } catch (ex) {
      console.log(ex);
    }
  };

  post = async (url: string, data: Object, headers: any) => {
    try {
      const response = await api.post(url, data, { headers: headers });

      return new Promise((resolve, reject) => {
        this.handlePromise(resolve, reject, response);
      });
    } catch (ex) {
      console.log(ex);
    }
  };

  handlePromise = (
    resolve: (value: Object) => void,
    reject: (reason?: any) => void,
    response: ErrorResponse | Object
  ) => {
    if ((response as ErrorResponse).error) {
      const errorResponse = response as ErrorResponse;

      if (errorResponse.error.code === "LOGIN_FAILED") {
        reject(ERROR_WRONG_CREDENTIALS);
      } else if (errorResponse.error.code === "NETWORK_ERROR") {
        reject(ERROR_NETWORK_NOT_AVAILABLE);
      } else {
        reject();
      }
    } else {
      resolve(response);
    }
  };
}

export default new ApiHelper();
