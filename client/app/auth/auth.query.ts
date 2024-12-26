/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import apiRequest from "@/lib/api-request/api-request";
import { RequestMethod } from "@/lib/api-request/api-types";
import { privateRoutePath } from "@/routes/private/private.routes";
import { setToStorage, storeToken } from "@/utils/storage";
import { useMutation, useQuery } from "@tanstack/react-query";

import { toast } from "react-toastify";

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
  },
  checkAuth: {
    controllerName: "auth/check-auth",
    actionName: "check_auth",
    requestMethod: RequestMethod.GET
  },
  logout: {
    controllerName: "auth/logout",
    actionName: "logout",
    requestMethod: RequestMethod.POST
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
        window.location.href = privateRoutePath.adminRoute.adminDashboard;
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
        setToStorage('token', response.token, 'local');
        setToStorage('role', response.role, 'local'); // Store role in local storage
        storeToken(response.token);
        // Redirect based on role
        const redirectPath = response.role === 'admin'
          ? privateRoutePath.adminRoute.adminDashboard
          : privateRoutePath.userRoute.home;

        window.location.href = redirectPath;
      }
    },
    onError(data: any) {
      toast.error(data.response.data.message)
    },
  });
};


export const useCheckAuth = () => {
  return useQuery({
    queryKey: [apiDetails.checkAuth.actionName],
    queryFn() {
      return apiRequest<BackendSuccessResponse<LoginResponse>>({
        apiDetails: apiDetails.checkAuth,
      });
    },
    select(data) {
      return data?.data;
    },
  });
}

export const useLogout = () => {
  return useMutation({
    mutationKey: [apiDetails.logout.actionName],
    mutationFn() {
      return apiRequest<BackendSuccessResponse<Record<'message', string>>>({
        apiDetails: apiDetails.logout
      })
    },
    meta: {
      disableSuccessToast: true,
    },
  })
}