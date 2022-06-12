import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

function ProductsTableItem({
  id,
  title,
  price,
  tax,
  stock,
}) {
  const [t] = useTranslation('global');

  const stockIsEmpty = stock === 0;

  return (
    <tr>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="font-medium text-sky-500">{id}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="font-medium text-gray-500">{title}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="font-medium text-gray-500">{price}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="rounded-full px-3 py-1 font-medium w-fit text-violet-600 bg-violet-200">
          {t(tax)}
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className={`
          font-medium
          rounded-full
          w-fit
          px-3
          py-1
          ${stockIsEmpty ? 'text-red-600 bg-red-200' : 'text-green-600 bg-green-200'}
        `}
        >
          {stockIsEmpty ? t('empty') : stock}
        </div>
      </td>
    </tr>
  );
}

ProductsTableItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  tax: PropTypes.string.isRequired,
  stock: PropTypes.number.isRequired,
};

export default ProductsTableItem;
