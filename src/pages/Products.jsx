import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useProducts } from '../hooks/useProducts';

import { DEFAULT_PER_PAGE, ORDER } from '../constants/filter';

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import SearchForm from '../components/SearchForm';
import DropdownFilter from '../components/DropdownFilter';
import ProductsTable from '../components/ProductsTable';
import PaginationNumeric from '../components/PaginationNumeric';

function Products() {
  const [t] = useTranslation('global');

  const {
    products,
    pagination,
    loading,
    getProducts,
  } = useProducts();

  const firstUpdate = useRef(true);

  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('');

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleChangeCurrentPageCriteria = (currentPage) => {
    setPage(currentPage);
  };

  const handleOrderByCriteria = (event) => {
    setOrderBy(event.target.value);
    setOrder(order === ORDER.ASC ? ORDER.DESC : ORDER.ASC);
  };

  const resetCriterias = () => {
    setOrderBy('');
    setOrder('');
    setPage(1);
  };

  const updateFiltersCriteria = (selectedFilters) => {
    setFilters([...selectedFilters]);
    resetCriterias();
  };

  const updateSearchCriteria = (searchText) => {
    setSearchCriteria(searchText);
    resetCriterias();
  };

  useEffect(() => {
    if (firstUpdate.current) {
      getProducts({ variables: { page, per_page: DEFAULT_PER_PAGE } });
      firstUpdate.current = false;

      return;
    }

    const newRequest = {
      ...filters.length > 0 && { tax_filter: filters },
      ...searchCriteria !== '' && { title_filter: searchCriteria },
      ...orderBy !== '' && { order_by: orderBy },
      ...order !== '' && { order },
      page,
      per_page: DEFAULT_PER_PAGE,
    };

    getProducts({ variables: newRequest });
  }, [filters, order, orderBy, page, searchCriteria]);

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
                <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">{t('products')}</h1>
              </div>
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                <SearchForm
                  updateSearchCriteria={updateSearchCriteria}
                />
                <DropdownFilter
                  align="right"
                  filters={filters}
                  updateFiltersCriteria={updateFiltersCriteria}
                />
              </div>
            </div>
            {loading ? (
              <div>Loading ...</div>
            ) : (
              <>
                <ProductsTable
                  pagination={pagination}
                  products={products}
                  handleOrderByCriteria={handleOrderByCriteria}
                />
                <div className="mt-8">
                  <PaginationNumeric
                    pagination={pagination}
                    handleChangeCurrentPageCriteria={handleChangeCurrentPageCriteria}
                  />
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Products;
