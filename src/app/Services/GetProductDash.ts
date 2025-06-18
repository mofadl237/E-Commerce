import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IPagination, IProduct, IProductUpdate } from "../../interface";
import CookieServices from "../../services/CookieServices";

type ProductResponse = { data: IProduct[]; meta?: IPagination };

export const apiSlice = createApi({
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}/api`,
  }),

  tagTypes: ["Product"],
  endpoints: (build) => ({
    getProductFetch: build.query<ProductResponse, void>({
      query: () => ({
        url: `/products?populate=categories&populate=thumbnail`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: "Product" as const,
                id,
              })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),

    deleteProductDash: build.mutation<void, string>({
      query: (documentId) => ({
        url: `/products/${documentId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${CookieServices.get("user").jwt}`,
        },
      }),
      invalidatesTags: (_result, _error, documentId) => [
        { type: "Product", id: documentId },
        { type: "Product", id: "LIST" },
      ],
    }),

    updateProductDash: build.mutation<
      void,
      { documentId: string; formData:IProductUpdate }
    >({
      query: ({ documentId, formData }) => ({
        url: `/products/${documentId}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${CookieServices.get("user").jwt}`,
        },
        body: {data:formData},
      }),
      invalidatesTags: (_result, _error, { documentId }) => [
        { type: "Product", id: documentId },
        { type: "Product", id: "LIST" },
      ],
    }),
  }),
});

export default apiSlice.reducer;

export const {
  useGetProductFetchQuery,
  useDeleteProductDashMutation,
  useUpdateProductDashMutation,
} = apiSlice;
