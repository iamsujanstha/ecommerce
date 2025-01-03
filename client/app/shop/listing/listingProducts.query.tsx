import { AddToCartPayload, AddToCartResponse, FilteredProductListRes, FilteredProductPayload } from "@/app/shop/listing/listingProducts.types"
import apiRequest from "@/lib/api-request/api-request"
import { RequestMethod } from "@/lib/api-request/api-types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const BASE_URL = 'shop/products'
export const CART_QUERY_KEY = ["cart"];

export const apiDetails = {
  getFilteredProductList: {
    controllerName: `${BASE_URL}/fetch`,
    actionName: 'filtered-products',
    requestMethod: RequestMethod.POST,
  },
  addToCart: {
    controllerName: 'shop/cart/add',
    actionName: 'add-to-cart',
    requestMethod: RequestMethod.POST
  },
  getCartItems: {
    controllerName: 'shop/cart/fetch/{userId}',
    actionName: 'fetch-cart-items',
    requestMethod: RequestMethod.GET
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

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [apiDetails.addToCart.actionName],
    mutationFn(requestData: AddToCartPayload) {
      return apiRequest<BackendSuccessResponse<AddToCartResponse>>({
        apiDetails: apiDetails.addToCart,
        requestData,
      });
    },
    onSuccess: (response) => {
      const addedCount = response?.data?.data?.items.length || 0;
      console.log({ response })
      // Update the global cart state
      queryClient.setQueryData<{ totalItems: number }>(
        CART_QUERY_KEY,
        (prev) => ({
          totalItems: (prev?.totalItems || 0) + addedCount,
        })
      );
    },
  });
};

export const useFetchCartItems = (userId: string) => {
  return useQuery({
    queryKey: [apiDetails.getCartItems.actionName],
    queryFn: () => {
      return apiRequest<BackendSuccessResponse<any>>({
        apiDetails: apiDetails.getCartItems,
        pathVariables: { userId }
      })
    },
    select: (state) => state.data.data,
    enabled: !!userId
  })
}


