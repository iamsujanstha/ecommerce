import { ApiDetailType, RequestBodyType, RequestDataType } from "@/lib/api-request/api-types";
import { RawAxiosRequestHeaders } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export function sanitizeApiController(
  apiDetail: ApiDetailType,
  pathVariables?: Record<string, string>
): string {

  let url = apiDetail.controllerName;
  if (pathVariables) {
    Object.entries(pathVariables).forEach(([key, value]) => {
      url = url.replace(`{${key}}`, encodeURIComponent(value));
    });
  }
  return `${BASE_URL}/${url}`;
}


// Generate headers based on the request body type
export function getRequestHeaders(apiDetails: ApiDetailType): RawAxiosRequestHeaders {
  const headers: RawAxiosRequestHeaders = {
    "Content-Type": "application/json",
  };

  if (apiDetails.requestBodyType === RequestBodyType.FORM_DATA) {
    headers["Content-Type"] = "multipart/form-data";
  } else if (apiDetails.requestBodyType === RequestBodyType.QUERY_STRING) {
    headers["Content-Type"] = "application/x-www-form-urlencoded";
  }
  return headers;
}

// Transform data for FormData or query string
export function transformRequestData(apiDetails: ApiDetailType, requestData?: RequestDataType) {
  if (!requestData) return undefined;

  if (apiDetails.requestBodyType === RequestBodyType.FORM_DATA) {
    const formData = new FormData();
    Object.entries(requestData).forEach(([key, value]) => {
      formData.append(key, value as string | Blob);
    });
    return formData;
  }

  if (apiDetails.requestBodyType === RequestBodyType.QUERY_STRING) {
    return new URLSearchParams(requestData as Record<string, string>);
  }

  return requestData;
}
