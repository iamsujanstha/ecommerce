import { getRequestHeaders, sanitizeApiController, transformRequestData } from "@/lib/api-request/utility/request-utils";
import { ApiDetailType, RequestDataType } from "./api-types";
import { AxiosResponse } from "axios";
import axiosInstance from "@/lib/api-request/utility/axios-instance";

interface ApiRequestConfig {
  apiDetails: ApiDetailType;
  pathVariables?: Record<string, string>;
  requestData?: RequestDataType;
  params?: Record<string, string | number>;
  headers?: Record<string, string>;
}

const apiRequest = async <TData>({
  apiDetails,
  pathVariables,
  requestData,
  params,
  headers = {},
}: ApiRequestConfig): Promise<AxiosResponse<TData>> => {
  const url = sanitizeApiController(apiDetails, pathVariables);
  const data = transformRequestData(apiDetails, requestData);
  const requestHeaders = { ...getRequestHeaders(apiDetails), ...headers };
  return await axiosInstance.request<TData>({
    url,
    method: apiDetails.requestMethod,
    params,
    data,
    headers: requestHeaders,
    withCredentials: true
  });
};

export default apiRequest;
