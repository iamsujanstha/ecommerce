/* eslint-disable @typescript-eslint/no-explicit-any */
import apiRequest from "@/lib/api-request/api-request";
import { RequestMethod } from "@/lib/api-request/api-types";
import { privateRoutePath } from "@/routes/private/private-route-path";
import { setToStorage } from "@/utility/storage";
import { useMutation } from "@tanstack/react-query";

export const apiDetails = {
  register: {
    controllerName: "auth/register",
    actionName: "register",
    requestMethod: RequestMethod.POST,
  },
  login: {
    controllerName: "auth/login",
    actionName: "login",
    requestMethod: RequestMethod.POST,
  }
}
type LoginResponse = Record<'token' | 'email' | 'id' | 'role', string>;


export const useRegister = () => {
  return useMutation({
    mutationKey: [apiDetails.register.actionName],
    mutationFn(requestData: any) {
      return apiRequest<BackendSuccessResponse<any>>({
        apiDetails: apiDetails.register,
        requestData: { ...requestData },
      });
    },
    onSuccess(data) {
      if (data?.data) {
        const response = data?.data as unknown as any;
        console.log(response)
        window.location.href = privateRoutePath.adminDashboard;
      }
    },
    meta: {
      disableSuccessToast: true,
    },
  });
};

export const useLogin = () => {
  return useMutation({
    mutationKey: [apiDetails.login.actionName],
    mutationFn(requestData: any) {
      return apiRequest<BackendSuccessResponse<any>>({
        apiDetails: apiDetails.login,
        requestData: { ...requestData },
      });
    },
    onSuccess(data) {
      if (data?.data) {
        const response = data?.data?.data as unknown as LoginResponse;
        // create(response.token)
        setToStorage('token', response.token, 'local')
        window.location.href = privateRoutePath.adminDashboard;
      }
    },
    meta: {
      disableSuccessToast: true,
    },
  });
};
