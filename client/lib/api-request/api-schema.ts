import { ApiDetailType, RequestBodyType, RequestDataType, RequestMethod, TransformedRequestData } from "@/lib/api-request/api-types";
import { pathParamSanitizer } from "@/utility/sanitizer";
import { AxiosRequestConfig, RawAxiosRequestHeaders } from "axios";
import { Primitive } from "type-fest";

export function getQueryString(data: GenericObj): URLSearchParams {
  return new URLSearchParams(data);
}

export const sanitizeApiController = (
  apiDetail: ApiDetailType,
  pathVariables?: GenericObj<Primitive>,
): ApiDetailType => {
  let controllerName = apiDetail.controllerName;
  if (pathVariables && Object.keys(pathVariables).length)
    controllerName = pathParamSanitizer(apiDetail.controllerName, pathVariables, "{}");

  return Object.assign(apiDetail, {
    controllerName,
  });
};

export const getRequestHeaders = (apiDetails: ApiDetailType) => {
  const token = 'asdfsdf';

  const headers: RawAxiosRequestHeaders = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  switch (apiDetails.requestBodyType) {
    case RequestBodyType.QUERY_STRING:
      return Object.assign(headers, { "Content-Type": "application/x-www-form-urlencoded" });
    case RequestBodyType.FORM_DATA:
      return Object.assign(headers, { "Content-Type": "multipart/form-data" });
    case RequestBodyType.BASIC_AUTH:
    case RequestBodyType.CLIENT_BASIC_AUTH:
      delete headers.Authorization;
      return Object.assign(headers, { "Content-Type": "application/x-www-form-urlencoded" });
    case RequestBodyType.NO_AUTH: {
      delete headers.Authorization;
      return headers;
    }
    default:
      return headers;
  }
};


export const transformRequestData = (
  apiDetails: ApiDetailType,
  requestData?: RequestDataType,
): TransformedRequestData => {
  if (!requestData) return {};

  switch (apiDetails.requestBodyType) {
    case RequestBodyType.FORM_DATA:
      return getFormData(requestData);
    case RequestBodyType.QUERY_STRING:
      return getQueryString(requestData as GenericObj);
    default:
      return requestData;
  }
};

export const getFormData = (requestData: RequestDataType) => {
  const formData = new FormData();
  for (const data of Object.keys(requestData)) {
    const requestDataPair = requestData[data];
    if (Array.isArray(requestDataPair)) {
      requestDataPair.forEach((dataEl: any, index: number) => {
        if (dataEl instanceof Object && !(dataEl instanceof File || dataEl instanceof Blob)) {
          Object.keys(dataEl).forEach((elKey) => formData.append(`${data}[${index}].${elKey}`, dataEl[elKey]));
        } else if (dataEl instanceof File) {
          formData.append(`${data}[${index}]`, dataEl);
        } else if (typeof dataEl === "number" || typeof dataEl === "string") {
          formData.append(`${data}[${index}]`, dataEl.toString());
        }
      });
    } else if (
      requestData[data] instanceof Object &&
      !(requestData[data] instanceof File) &&
      !(requestData[data] instanceof Blob)
    ) {
      Object.entries(requestData[data] as object).forEach(([key, value]) =>
        formData.append(`${data}.${key}`, value as string),
      );
    } else {
      formData.append(data, requestData[data] as string);
    }
  }
  return formData;
};

export const getAxiosParams = (apiDetails: ApiDetailType, headers: RawAxiosRequestHeaders = {}) => {
  const axiosRequestParams: AxiosRequestConfig = {
    baseURL: apiDetails.baseUrl,
    url: apiDetails.controllerName,
    method: apiDetails.requestMethod || RequestMethod.GET,
    responseType: "json",
    // this is for server response timeout
    timeout: 60 * 60 * 1000,
    signal: AbortSignal.timeout(60 * 60 * 1000),
    headers: { ...getRequestHeaders(apiDetails), ...headers },
  };

  if (apiDetails.requestBodyType === RequestBodyType.FILE) axiosRequestParams.responseType = "blob";

  return axiosRequestParams;
};
