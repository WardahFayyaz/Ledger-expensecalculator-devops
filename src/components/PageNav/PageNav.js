import React from 'react';
import {
  BsSpeedometer2,
  BsBarChart,
  BsPlusCircle,
  BsListUl,
} from 'react-icons/bs';
import './PageNav.css';

const PAGES = [
  { id: 'overview', label: 'Overview', icon: BsSpeedometer2 },
  { id: 'charts', label: 'Charts', icon: BsBarChart },
  { id: 'add', label: 'Add', icon: BsPlusCircle },
  { id: 'expenses', label: 'Expenses', icon: BsListUl },
];

export default function PageNav({ activePage, onChange }) {
  return (
    <nav className="page-nav" aria-label="Main pages">
      {PAGES.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          type="button"
          className={`page-nav__btn ${activePage === id ? 'page-nav__btn--active' : ''}`}
          onClick={() => onChange(id)}
          aria-current={activePage === id ? 'page' : undefined}
        >
          <Icon size={18} aria-hidden="true" />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}
