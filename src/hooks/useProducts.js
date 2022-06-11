import { useLazyQuery } from '@apollo/client';

import { GET_PRODUCTS } from '../graphql/getProducts';

export const useProducts = () => {
  const [getProducts, result] = useLazyQuery(GET_PRODUCTS);

  return {
    products: result.data?.fetchProducts?.results,
    pagination: result.data?.fetchProducts?.pagination,
    loading: result.loading,
    getProducts,
  };
};
