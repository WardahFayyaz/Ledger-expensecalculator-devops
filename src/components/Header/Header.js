import React from 'react';
import { BsMoonStars, BsSun, BsDownload } from 'react-icons/bs';
import './Header.css';

export default function Header({ theme, onToggleTheme, onExport }) {
  return (
    <header className="header">
      <div className="header__brand-row">
        <div>
          <p className="header__brand">Ledger</p>
          <h1 className="header__title">Expense Calculator</h1>
        </div>
        <div className="header__toolbar">
          <button
            type="button"
            className="btn btn--ghost header__tool"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <BsSun size={16} /> : <BsMoonStars size={16} />}
            <span className="header__tool-label">{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
          <button
            type="button"
            className="btn btn--ghost header__tool"
            onClick={onExport}
            aria-label="Export expenses as CSV"
          >
            <BsDownload size={16} />
            <span className="header__tool-label">Export</span>
          </button>
        </div>
      </div>
    </header>
  );
}
