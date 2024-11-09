import initApiRequest from "@/lib/api-request/api-request";
import { RequestBodyType, RequestMethod } from "@/lib/api-request/api-types";
import { privateRoutePath } from "@/routes/private/private-route-path";
import { useMutation } from "@tanstack/react-query";

export const apiDetails = {
  register: {
    controllerName: "/auth/login",
    actionName: "login",
    requestMethod: RequestMethod.POST,
    requestBodyType: RequestBodyType.FORM_DATA
  }
}

export const useLogin = () => {
  return useMutation({
    mutationKey: [apiDetails.register.actionName],
    mutationFn(requestData: any) {
      return initApiRequest<BackendSuccessResponse<any>>({
        apiDetails: apiDetails.register,
        requestData: { ...requestData },
      });
    },
    onSuccess(data) {
      if (data?.data) {
        const response = data?.data as unknown as any;
        console.log(response)
        window.location.href = privateRoutePath.base;
      }
    },
    meta: {
      disableSuccessToast: true,
    },
  });
};
