import React from 'react';
import PropTypes from 'prop-types';

import Products from './ProductsTableItem';

function ProductsTable({ pagination, products, handleOrderByCriteria }) {
  return (
    <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-slate-800">
          Productos
          {' '}
          <span className="text-slate-400 font-medium">{pagination.totalResults}</span>
        </h2>
      </header>
      <div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-b border-slate-200">
              <tr>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <button
                    className="w-full font-semibold text-left"
                    type="button"
                    value="id"
                    onClick={handleOrderByCriteria}
                  >
                    SKU
                  </button>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <button
                    className="w-full font-semibold text-left"
                    type="button"
                    value="title"
                    onClick={handleOrderByCriteria}
                  >
                    Artículo
                  </button>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <button
                    className="w-full font-semibold text-left"
                    type="button"
                    value="price"
                    onClick={handleOrderByCriteria}
                  >
                    Precio
                  </button>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <button
                    className="w-full font-semibold text-left"
                    type="button"
                    value="tax"
                    onClick={handleOrderByCriteria}
                  >
                    Impuesto
                  </button>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <button
                    className="w-full font-semibold text-left"
                    type="button"
                    value="stock"
                    onClick={handleOrderByCriteria}
                  >
                    Stock
                  </button>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-200">
              {
                products.map((product) => (
                  <Products
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    tax={product.tax}
                    stock={product.stock}
                  />
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

ProductsTable.propTypes = {
  pagination: PropTypes.shape({
    currentPage: PropTypes.number,
    firstPage: PropTypes.bool,
    lastPage: PropTypes.bool,
    limitValue: PropTypes.number,
    nextPage: PropTypes.number,
    outOfRange: PropTypes.bool,
    prevPage: PropTypes.number,
    totalPages: PropTypes.number,
    totalResults: PropTypes.number,
  }).isRequired,
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    tax: PropTypes.string.isRequired,
    stock: PropTypes.number.isRequired,
  })).isRequired,
  handleOrderByCriteria: PropTypes.func.isRequired,
};

export default ProductsTable;
