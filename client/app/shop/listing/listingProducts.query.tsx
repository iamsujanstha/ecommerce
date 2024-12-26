import { FilteredProductListRes, FilteredProductPayload } from "@/app/shop/listing/listingProducts.types"
import apiRequest from "@/lib/api-request/api-request"
import { RequestMethod } from "@/lib/api-request/api-types"
import { useMutation } from "@tanstack/react-query"

const BASE_URL = 'shop/products'

export const apiDetails = {
  getFilteredProductList: {
    controllerName: `${BASE_URL}/fetch`,
    actionName: 'filtered-products',
    requestMethod: RequestMethod.POST,
  }
}

export const useFilteredProductList = () => {
  return useMutation({
    mutationKey: [apiDetails.getFilteredProductList.actionName],
    mutationFn(requestData: Partial<FilteredProductPayload>) {
      return apiRequest<BackendSuccessResponse<FilteredProductListRes[]>>({
        apiDetails: apiDetails.getFilteredProductList,
        requestData
      })
    }
  })
}