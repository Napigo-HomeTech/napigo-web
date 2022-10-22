// import { AppConfig } from "@/config/app.config";
import axios, { CancelTokenSource } from "axios";

// export type APIOptions = {
//     url: string;
// };

// export type CallParams = {
//     url: string;
//     params: any;
//     data: Record<string, any>;
//     method: "GET" | "POST" | "PUT" | "DELETE";
//     signal: CancelTokenSource;
//     headers: Record<string, any>;
// };

// const SERVICE_HOST_MAPPING = {
//     "finance-service": AppConfig.serviceHost,
// };

// export class API {
//     private signal;
//     priwqvate axiosInstance;
//     private endpointUrl;

//     constructor(options: APIOptions) {
//         this.signal = axios.CancelToken.source();
//         // The slug before the first "/" should be the mapping to
//         // the base host
//         const [base, ...servicePath] = options.url.split("/");
//         const hostMapping = base as keyof typeof SERVICE_HOST_MAPPING;
//         this.axiosInstance = axios.create({ baseURL: SERVICE_HOST_MAPPING[hostMapping] });
//         const endp = servicePath.join("/");
//         this.endpointUrl = endp;
//     }

//     get = (params = {}, body = {}, headers = {}) => {
//         const callParams: CallParams = {
//             url: this.endpointUrl,
//             method: "GET",
//             params,
//             data: body,
//             signal: this.signal,
//             headers,
//         };
//         return this.restCall(callParams);
//     };
//     post = (params = {}, body = {}, headers = {}) => {
//         const callParams: CallParams = {
//             url: this.endpointUrl,
//             method: "POST",
//             params,
//             data: body,
//             signal: this.signal,
//             headers,
//         };
//         return this.restCall(callParams);
//     };
//     put = (params = {}, body = {}, headers = {}) => {
//         const callParams: CallParams = {
//             url: this.endpointUrl,
//             method: "PUT",
//             params,
//             data: body,
//             signal: this.signal,
//             headers,
//         };
//         return this.restCall(callParams);
//     };
//     delete = (params = {}, body = {}, headers = {}) => {
//         const callParams: CallParams = {
//             url: this.endpointUrl,
//             method: "DELETE",
//             params,
//             data: body,
//             signal: this.signal,
//             headers,
//         };
//         return this.restCall(callParams);
//     };

//     /**
//      *
//      * @param api
//      * @param method
//      * @param signal
//      * @param headers
//      */
//     restCall = (params: CallParams) => {
//         const { url, method, params: reqParam, data, signal, headers } = params;
//         /**
//          * Common headers required for all rest call
//          */
//         headers["Content-Type"] = "application/json";

//         return this.axiosInstance({
//             url,
//             method: method.toLowerCase(),
//             params: reqParam,
//             data,
//             responseType: "json",
//             cancelToken: signal.token,
//         });
//     };
// }
