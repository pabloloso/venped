import React, { useEffect, useState } from 'react';

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import SearchForm from '../components/SearchForm';
import FilterButton from '../components/DropdownFilter';
import ProductsTable from '../components/ProductsTable';
import PaginationNumeric from '../components/PaginationNumeric';

function Products() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const [productsData, setProductsData] = useState([]);
  const [paginationData, setPaginationData] = useState({});

  useEffect(() => {
    fetch('http://vps-123eb2fc.vps.ovh.net/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query {
            fetchProducts {
              results(page: ${currentPage}, perPage: 10) { id, title, price, tax, stock },
              pagination(page: ${currentPage}, perPage: 10) {
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
      `,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const { pagination, results } = data.data.fetchProducts;

        setPaginationData(pagination);
        setProductsData(results);
      });
  }, [currentPage]);

  const handleChangeCurrentPage = (page) => {
    console.log(page);
    setCurrentPage(page);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="sm:flex sm:justify-between sm:items-center mb-5">
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">Catálogo</h1>
              </div>
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                <SearchForm />
                <FilterButton align="right" />
              </div>
            </div>
            <ProductsTable
              pagination={paginationData}
              products={productsData}
            />
            <div className="mt-8">
              <PaginationNumeric
                pagination={paginationData}
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
