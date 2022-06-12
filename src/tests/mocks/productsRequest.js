import { GET_PRODUCTS } from '../../graphql/getProducts';

export const pagination = {
  currentPage: 20,
  firstPage: false,
  lastPage: false,
  limitValue: 10,
  nextPage: 21,
  outOfRange: false,
  prevPage: 19,
  totalPages: 96,
  totalResults: 953,
};

export const products = [{
  id: '2',
  price: 69.43,
  stock: 21,
  tax: 'es_general_21',
  title: 'Lightweight Wooden Coat',
}, {
  id: '3',
  price: 9.45,
  stock: 19,
  tax: 'es_super-reduced_4',
  title: 'Lightweight Wooden Bench',
}, {
  id: '4',
  price: 81.76,
  stock: 19,
  tax: 'es_reduced_10',
  title: 'Aerodynamic Aluminum Pants',
}];

export const getProductsQueryMock = [
  {
    request: {
      query: GET_PRODUCTS,
      variables: {
        page: 1,
        per_page: 10,
      },
    },
    result: {
      data: {
        fetchProducts: {
          pagination: {
            currentPage: 1,
            firstPage: true,
            lastPage: false,
            limitValue: 10,
            nextPage: 2,
            outOfRange: false,
            prevPage: null,
            totalPages: 96,
            totalResults: 953,
            __typename: 'Pagination',
          },
          results: [{
            id: '2',
            price: 69.43,
            stock: 21,
            tax: 'es_general_21',
            title: 'Lightweight Wooden Coat',
            __typename: 'Product',
          }],
        },
      },
    },
  },
];
