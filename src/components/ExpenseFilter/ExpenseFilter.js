import React from 'react';
import { CATEGORIES } from '../../utils/categories';
import './ExpenseFilter.css';

const PERIODS = [
  { id: 'all', label: 'All time' },
  { id: 'month', label: 'This month' },
  { id: '30', label: 'Last 30 days' },
];

export default function ExpenseFilter({
  year,
  category,
  search,
  sortBy,
  period,
  onYearChange,
  onCategoryChange,
  onSearchChange,
  onSortChange,
  onPeriodChange,
  onClear,
}) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 8 }, (_, i) => currentYear - i);

  return (
    <div className="expenses-filter">
      <div className="expenses-filter__periods" role="group" aria-label="Quick period">
        {PERIODS.map((p) => (
          <button
            key={p.id}
            type="button"
            className={`expenses-filter__period ${
              period === p.id ? 'expenses-filter__period--active' : ''
            }`}
            onClick={() => onPeriodChange(p.id)}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="expenses-filter__search">
        <label htmlFor="expense-search" className="sr-only">
          Search expenses
        </label>
        <input
          id="expense-search"
          type="search"
          placeholder="Search by title or notes…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="expenses-filter__row">
        <div className="expenses-filter__field">
          <label htmlFor="filter-year">Year</label>
          <select
            id="filter-year"
            value={year}
            onChange={(e) => onYearChange(e.target.value)}
            disabled={period !== 'all'}
          >
            <option value="">All years</option>
            {years.map((y) => (
              <option key={y} value={String(y)}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <div className="expenses-filter__field">
          <label htmlFor="filter-category">Category</label>
          <select
            id="filter-category"
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value="">All</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div className="expenses-filter__field">
          <label htmlFor="filter-sort">Sort</label>
          <select
            id="filter-sort"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="date-desc">Newest first</option>
            <option value="date-asc">Oldest first</option>
            <option value="amount-desc">Highest amount</option>
            <option value="amount-asc">Lowest amount</option>
            <option value="title-asc">Title A–Z</option>
          </select>
        </div>

        <button type="button" className="btn btn--ghost expenses-filter__clear" onClick={onClear}>
          Clear
        </button>
      </div>
    </div>
  );
}
