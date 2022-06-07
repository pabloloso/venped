import React, { useEffect, useRef, useState } from 'react';
import { gql, useLazyQuery, useQuery } from '@apollo/client';

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import SearchForm from '../components/SearchForm';
import DropdownFilter from '../components/DropdownFilter';
import ProductsTable from '../components/ProductsTable';
import PaginationNumeric from '../components/PaginationNumeric';

const query = gql`
  query {
    fetchProducts {
      results(
        page: 1,
        perPage: 10
      ) {
        id,
        title,
        price,
        tax,
        stock
      },
      pagination(
        page: 1,
        perPage: 10
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

const prueba = gql`
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

function Products() {
  const { loading, data } = useQuery(query);
  const [getProducts, result] = useLazyQuery(prueba);
  const { loading: loadingResult } = result;

  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('');

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleChangeCurrentPage = (currentPage) => {
    setPage(currentPage);
  };

  const handleOrderBy = (event) => {
    setOrderBy(event.target.value);
    setOrder(order === 'ASC' ? 'DESC' : 'ASC');
  };

  const resetCriterias = () => {
    setOrderBy('');
    setOrder('');
    setPage(1);
  };

  const updateFiltersRequest = (selectedFilters) => {
    setFilters([...selectedFilters]);
    resetCriterias();
  };

  const searchProduct = (searchText) => {
    setSearchCriteria(searchText);
    resetCriterias();
  };

  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    const newRequest = {
      ...filters.length > 0 && { tax_filter: filters },
      ...searchCriteria !== '' && { title_filter: searchCriteria },
      ...orderBy !== '' && { order_by: orderBy },
      ...order !== '' && { order },
      page,
      per_page: 10,
    };

    getProducts({ variables: newRequest });
  }, [filters, order, orderBy, page, searchCriteria]);

  if (loading || loadingResult) return 'Loading ....';

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="sm:flex sm:justify-between sm:items-center mb-5">
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">Catálogo</h1>
              </div>
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                <SearchForm
                  searchProduct={searchProduct}
                />
                <DropdownFilter
                  align="right"
                  filters={filters}
                  updateFiltersRequest={updateFiltersRequest}
                />
              </div>
            </div>
            <ProductsTable
              pagination={result.data?.fetchProducts?.pagination || data.fetchProducts.pagination}
              products={result.data?.fetchProducts?.results || data.fetchProducts.results}
              handleOrderBy={handleOrderBy}
            />
            <div className="mt-8">
              <PaginationNumeric
                pagination={result.data?.fetchProducts?.pagination || data.fetchProducts.pagination}
                handleChangeCurrentPage={handleChangeCurrentPage}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Products;
