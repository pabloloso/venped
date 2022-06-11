import React from 'react';
import { useTranslation } from 'react-i18next';

import { DEFAULT_LANGUAGE } from '../constants/language';

function Header() {
  const [, i18n] = useTranslation('global');

  const handleChangeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <header className="sticky top-0 bg-white border-b border-slate-200 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          <div className="flex" />
          <div className="flex items-center space-x-3">
            <select
              className="form-select focus:border-slate-300"
              defaultValue={DEFAULT_LANGUAGE}
              onChange={handleChangeLanguage}
            >
              <option value="en">EN</option>
              <option value="es">ES</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
