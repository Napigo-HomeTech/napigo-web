/**
 * This module contains all about the axios api to help us
 * fetch data from our microservices via the backend api-gateway
 */
import { AppConfig } from "@/config/app.config";
import axios, { AxiosRequestConfig } from "axios";

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
 * Request middleware used in axios interceptor
 * @param config
 * @returns
 */
const requestInterceptorHandler = (config: AxiosRequestConfig) => {
    config.headers = { ..._createReqHeaders() };
    return config;
};

/**
 * Defined the interceptors handler, acting as a middleware for cases
 * such as preparing auth headers, tokens etc into the request before proceeding
 * the call
 */
axiosInstance.interceptors.request.use(requestInterceptorHandler);

/**
 * Attached all the required header for every api calls,
 * including Auth token, Idempotent Key etc..whichever required or available
 */
const _createReqHeaders = () => {
    /**
     * As for now, simple implementation until we have design the full flow
     * of user session fetching
     */
    return {
        "Content-Type": "application/json",
        Authorization: "Bearer jwtvhdvidcdv6897vdsvdaivdavav",
        "X-Token-Auth": "123346744",
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
        counts: number;
        limit: number;
        page: number;
        offset: number;
        lastPage: number;
        results: T[];
    };
}

/**
 *
 */
const get = async (url = "", params = {}, body = {}) => {
    return await axiosInstance({
        url,
        method: "get",
        params,
        data: { ...body },
    });
};
/**
 *
 */
const post = async (url = "", params = {}, body = {}) => {
    return await axiosInstance({
        url,
        method: "post",
        params,
        data: { ...body },
    });
};
/**
 *
 */
const put = async (url = "", params = {}, body = {}) => {
    return await axiosInstance({
        url,
        method: "put",
        params,
        data: { ...body },
    });
};
/**
 *
 */
const patch = async (url = "", params = {}, body = {}) => {
    return await axiosInstance({
        url,
        method: "patch",
        params,
        data: { ...body },
    });
};
/**
 * Since the delete  is clash with the js keywords, we renamed it as
 * remove.. but the http verb should be DELETE
 */
const remove = async (url = "", params = {}, body = {}) => {
    return await axiosInstance({
        url,
        method: "delete",
        params,
        data: { ...body },
    });
};

export { axiosInstance, get, post, put, patch, remove };
