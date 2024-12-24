import apiRequest from "@/lib/api-request/api-request"
import { RequestBodyType, RequestMethod } from "@/lib/api-request/api-types"
import { useMutation, useQuery } from "@tanstack/react-query"

const BASE_URL = 'shop/products'

export const apiDetails = {
  getFilteredProductList: {
    controllerName: `${BASE_URL}/filtered/{params}`,
    actionName: 'filtered-products',
    requestMethod: RequestMethod.GET,
    requestBodyType: RequestBodyType.FORM_DATA
  }
}

export const useFilteredProductList = () => {
  return useQuery({
    queryKey: [apiDetails.getFilteredProductList.actionName],
    queryFn(params: any) {
      return apiRequest<BackendSuccessResponse<any>>({
        apiDetails: apiDetails.getFilteredProductList,
        params
      })
    }
  })
}