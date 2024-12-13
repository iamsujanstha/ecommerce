import apiRequest from "@/lib/api-request/api-request"
import { RequestBodyType, RequestMethod } from "@/lib/api-request/api-types"
import { useMutation } from "@tanstack/react-query"

const BASE_URL = 'admin/products'

export const apiDetails = {
  uploadImage: {
    controllerName: `${BASE_URL}/upload-image`,
    actionName: 'upload-image',
    requestMethod: RequestMethod.POST,
    requestBodyType: RequestBodyType.FORM_DATA
  }
}

export const useImageUpload = () => {
  return useMutation({
    mutationKey: [apiDetails.uploadImage.actionName],
    mutationFn(file: File) {
      return apiRequest<File>({
        apiDetails: apiDetails.uploadImage,
        requestData: { file }
      });
    },
  })
}