import { getAxiosParams, sanitizeApiController, transformRequestData } from "@/lib/api-request/api-schema";
import { ApiDetailType, RequestDataType } from "@/lib/api-request/api-types";
import Axios, { AxiosResponse, RawAxiosRequestHeaders } from "axios"
import { Primitive } from "type-fest";


export interface InitApiRequest {
  apiDetails: ApiDetailType;
  pathVariables?: GenericObj<Primitive>;
  params?: { [key: string]: Primitive | Array<GenericObj<Primitive>> };
  requestData?: RequestDataType;
  signal?: AbortSignal;
  headers?: RawAxiosRequestHeaders;
}

const initApiRequest = async<TData>({
  apiDetails,
  pathVariables,
  params,
  headers,
  signal,
  requestData
}: InitApiRequest): Promise<AxiosResponse<TData> | undefined> => {
  const sanitizedDetails = sanitizeApiController({ ...apiDetails }, pathVariables);
  const axiosParams = getAxiosParams(sanitizedDetails, {
    ...headers,
    // "X-Tenant-id": getFromLocalStorage("X-TenantID"),
  });

  try {
    return await Axios.request<TData>({
      ...axiosParams,
      params,
      signal: signal ?? axiosParams.signal,
      data: transformRequestData(sanitizedDetails, requestData),
    })
  } catch (error) {
    console.log(error)
  }
}

export default initApiRequest;