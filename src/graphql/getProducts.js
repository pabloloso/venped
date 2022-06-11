import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query FetchProducts (
    $tax_filter: [String!],
    $title_filter: String,
    $order_by: String,
    $order: String,
    $page: Int!,
    $per_page: Int!
  ) {
    fetchProducts {
      results(
        taxFilter: $tax_filter,
        titleFilter: $title_filter,
        orderBy: $order_by,
        order: $order,
        page: $page,
        perPage: $per_page
      ) {
        id,
        title,
        price,
        tax,
        stock
      },
      pagination(
        taxFilter: $tax_filter,
        titleFilter: $title_filter,
        orderBy: $order_by,
        order: $order,
        page: $page,
        perPage: $per_page
      ) {
        totalResults,
        limitValue,
        totalPages,
        currentPage,
        nextPage,
        prevPage,
        firstPage,
        lastPage,
        outOfRange
      }
    }
  }
`;
