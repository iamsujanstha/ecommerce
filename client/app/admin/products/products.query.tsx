import { AddProductResponseType } from "@/app/admin/products/products.types"
import { AddProductType as AddProductRequestType, AddProductType } from "@/config"
import apiRequest from "@/lib/api-request/api-request"
import { RequestBodyType, RequestMethod } from "@/lib/api-request/api-types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const BASE_URL = 'admin/products'

export const apiDetails = {
  uploadImage: {
    controllerName: `${BASE_URL}/upload-image`,
    actionName: 'upload-image',
    requestMethod: RequestMethod.POST,
    requestBodyType: RequestBodyType.FORM_DATA
  },
  addProduct: {
    controllerName: `${BASE_URL}/add`,
    actionName: 'add-product',
    requestMethod: RequestMethod.POST
  },
  getProductList: {
    controllerName: `${BASE_URL}`,
    actionName: 'get-products',
    requestMethod: RequestMethod.GET
  },
  deleteProduct: {
    controllerName: `${BASE_URL}/{id}`,
    actionName: 'delete-product',
    requestMethod: RequestMethod.DELETE
  },
  updateProduct: {
    controllerName: `${BASE_URL}/{id}`,
    actionName: 'update-product',
    requestMethod: RequestMethod.PUT
  }

}

export const useImageUpload = () => {
  return useMutation({
    mutationKey: [apiDetails.uploadImage.actionName],
    mutationFn(file: File) {
      return apiRequest<BackendSuccessResponse<Record<'url', string>>>({
        apiDetails: apiDetails.uploadImage,
        requestData: { file }
      });
    },
  })
}

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [apiDetails.addProduct.actionName],
    mutationFn(requestData: AddProductRequestType) {
      return apiRequest<BackendSuccessResponse<AddProductRequestType>>({
        apiDetails: apiDetails.addProduct,
        requestData
      })
    },
    onSuccess: () => {
      // Invalidate the query after the deletion is successful
      queryClient.invalidateQueries([apiDetails.getProductList.actionName]);
    },
  })
}

export const useGetProductList = () => {
  return useQuery({
    queryKey: [apiDetails.getProductList.actionName],
    queryFn() {
      return apiRequest<BackendSuccessResponse<AddProductResponseType[]>>({
        apiDetails: apiDetails.getProductList
      })
    },
  })
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [apiDetails.deleteProduct.actionName],
    mutationFn({ id }: { id: string }) {
      return apiRequest<BackendSuccessResponse<Record<'message', string>>>({
        apiDetails: apiDetails.deleteProduct,
        pathVariables: { id }
      })
    },
    onSuccess: () => {
      // Invalidate the query after the deletion is successful
      queryClient.invalidateQueries([apiDetails.getProductList.actionName]);
    },
  })
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [apiDetails.updateProduct.actionName],
    mutationFn({ id, requestData }: { id: string, requestData: AddProductType }) {
      return apiRequest<BackendSuccessResponse<AddProductResponseType[]>>({
        apiDetails: apiDetails.updateProduct,
        pathVariables: { id },
        requestData
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries([apiDetails.getProductList.actionName])
    }
  })
}