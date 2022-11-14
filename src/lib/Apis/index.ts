/**
 * This module contains all about the axios api to help us
 * fetch data from our microservices via the backend api-gateway
 */
import { AppConfig } from "@/config/app.config";
import axios, { AxiosError, AxiosResponse } from "axios";
import { auth, getCSRFToken } from "../Auth";
import { actions } from "../Redux/account.reducer";
import { store } from "../Redux/store";

/**
 * The main instance of axios instantiate with its basic config such as timeout and basic headers
 */
const axiosInstance = axios.create({
  baseURL: AppConfig.serviceHost,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "",
  },
});

/**
 *
 * @param error
 * @returns
 */
const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
  if (
    error.response?.status == 401 &&
    (error.response.data as any).exp !== undefined
  ) {
    try {
      const idToken = (await auth.currentUser?.getIdToken()) ?? "";
      const response = await getCSRFToken(idToken);
      store.dispatch(actions.setCSRF(response.csrfToken));
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.csrfToken}`;
      axios.defaults.headers.common["X-CSRF-Token"] = response.csrfToken;

      /**
       * Proceed with the retry once token is refreshed and set back to the in-memory
       */
      return axios(error.config!);
    } catch (err) {
      return Promise.reject(new Error("Failed to refresh expired CSRF token"));
    }
  }
  return Promise.reject(error);
};

/**
 * Defined the interceptors handler, acting as a middleware for cases
 * such as preparing auth headers, tokens etc into the request before proceeding
 * the call
 */
// axiosInstance.interceptors.request.use(requestInterceptorHandler);
axiosInstance.interceptors.response.use(
  (resp: AxiosResponse) => resp,
  onResponseError
);

/**
 * Attached all the required header for every api calls,
 * including Auth token, Idempotent Key etc..whichever required or available
 */
const withAuthHeaders = () => {
  const csrfToken = store.getState().accountStore.csrf;
  /**
   * As for now, simple implementation until we have design the full flow
   * of user session fetching
   */
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${csrfToken}`,
    "X-CSRF-Token": csrfToken,
  };
};

/**
 * Common Responses interface which pertained a collection type of
 * resources
 */
export interface CollectionBasedResponse<T> {
  code: number;
  status: string;
  data: {
    total_count: number;
    limit: number;
    offset: number;
    page: number;
    lastPage: number;
    results: T[];
  };
}
export interface BasedResponse<T> {
  code: number;
  data: T;
  status: string;
}

export type CallConfig = {
  url: string;
  params?: Record<string, any>;
  body?: Record<string, any>;
  withAuth?: boolean;
};
/**
 *
 */
const get = async ({ url = "", params = {}, body = {}, withAuth = false }) => {
  return await axiosInstance({
    url,
    method: "get",
    params: params,
    headers: withAuth ? withAuthHeaders() : {},
    data: { ...body },
  });
};
/**
 *
 */
const post = async ({ url = "", params = {}, body = {}, withAuth = false }) => {
  return await axiosInstance({
    url,
    method: "post",
    params: params,
    headers: withAuth ? withAuthHeaders() : {},
    data: { ...body },
  });
};
/**
 *
 */
const put = async ({ url = "", params = {}, body = {}, withAuth = false }) => {
  return await axiosInstance({
    url: url,
    method: "put",
    params: params,
    headers: withAuth ? withAuthHeaders() : {},
    data: { ...body },
  });
};
/**
 *
 */
const patch = async ({
  url = "",
  params = {},
  body = {},
  withAuth = false,
}) => {
  return await axiosInstance({
    url: url,
    method: "patch",
    params: params,
    headers: withAuth ? withAuthHeaders() : {},
    data: { ...body },
  });
};
/**
 * Since the delete  is clash with the js keywords, we renamed it as
 * remove.. but the http verb should be DELETE
 */
const remove = async ({
  url = "",
  params = {},
  body = {},
  withAuth = false,
}) => {
  return await axiosInstance({
    url: url,
    method: "delete",
    params: params,
    headers: withAuth ? withAuthHeaders() : {},
    data: { ...body },
  });
};

export { axiosInstance, get, post, put, patch, remove, withAuthHeaders };
