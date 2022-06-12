import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Transition from '../utils/Transition';

function DropdownFilter({ align, filters, updateFiltersCriteria }) {
  const [t] = useTranslation('global');

  const [selectedFilters, setSelectedFilters] = useState(filters.length > 0 ? filters : []);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) {
        return;
      }

      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) {
        return;
      }

      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  const handleSelectFilter = (event) => {
    if (event.target.checked) {
      setSelectedFilters([
        ...selectedFilters,
        event.target.value,
      ]);
      return;
    }

    setSelectedFilters(selectedFilters.filter((filter) => filter !== event.target.value));
  };

  const handleClearFilters = () => {
    setSelectedFilters([]);
  };

  const handleApplyFilters = () => {
    setDropdownOpen(false);

    updateFiltersCriteria(selectedFilters);
  };

  return (
    <div className="relative inline-flex">
      <button
        type="button"
        ref={trigger}
        className="btn bg-white border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-600"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <span className="sr-only">{t('filter')}</span>
        <wbr />
        {t('taxes')}
      </button>
      <Transition
        show={dropdownOpen}
        tag="div"
        className={`
          origin-top-right
          z-10
          absolute
          top-full
          min-w-56
          bg-white
          border
          border-slate-200
          pt-1.5
          rounded
          shadow-lg
          overflow-hidden
          mt-1
          ${align === 'right' ? 'right-0' : 'left-0'}
        `}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div ref={dropdown}>
          <div className="text-xs font-semibold text-slate-400 uppercase pt-1.5 pb-2 px-4">{t('filters')}</div>
          <ul className="mb-4">
            <li className="py-1 px-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  value="es_general_21"
                  checked={selectedFilters.includes('es_general_21')}
                  onChange={handleSelectFilter}
                />
                <span className="text-sm font-medium ml-2">{t('es_general_21')}</span>
              </label>
            </li>
            <li className="py-1 px-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  value="es_reduced_10"
                  checked={selectedFilters.includes('es_reduced_10')}
                  onChange={handleSelectFilter}
                />
                <span className="text-sm font-medium ml-2">{t('es_general_10')}</span>
              </label>
            </li>
            <li className="py-1 px-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  value="es_super-reduced_4"
                  checked={selectedFilters.includes('es_super-reduced_4')}
                  onChange={handleSelectFilter}
                />
                <span className="text-sm font-medium ml-2">{t('es_super-reduced_4')}</span>
              </label>
            </li>
            <li className="py-1 px-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  value="fr_general_20"
                  checked={selectedFilters.includes('fr_general_20')}
                  onChange={handleSelectFilter}
                />
                <span className="text-sm font-medium ml-2">{t('fr_general_20')}</span>
              </label>
            </li>
            <li className="py-1 px-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  value="fr_reduced_5.5"
                  checked={selectedFilters.includes('fr_reduced_5.5')}
                  onChange={handleSelectFilter}
                />
                <span className="text-sm font-medium ml-2">{t('fr_reduced_5.5')}</span>
              </label>
            </li>
          </ul>
          <div className="py-2 px-3 border-t border-slate-200 bg-slate-50">
            <ul className="flex items-center justify-between">
              <li>
                <button
                  type="button"
                  className="btn-xs bg-white border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-600"
                  onClick={handleClearFilters}
                >
                  {t('clear')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="btn-xs bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={handleApplyFilters}
                  onBlur={() => setDropdownOpen(false)}
                >
                  {t('apply')}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </Transition>
    </div>
  );
}

DropdownFilter.propTypes = {
  align: PropTypes.string.isRequired,
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
  updateFiltersCriteria: PropTypes.func.isRequired,
};

export default DropdownFilter;
