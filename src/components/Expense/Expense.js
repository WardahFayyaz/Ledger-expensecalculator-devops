import React, { useMemo, useState } from 'react';
import ExpenseItem from '../ExpenseItem/ExpenseItem';
import ExpenseFilter from '../ExpenseFilter/ExpenseFilter';
import {
  formatCurrency,
  isSameMonth,
  isWithinLastDays,
} from '../../utils/categories';
import './Expense.css';

const sortExpenses = (list, sortBy) => {
  const sorted = [...list];
  switch (sortBy) {
    case 'date-asc':
      return sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
    case 'amount-desc':
      return sorted.sort((a, b) => Number(b.amount) - Number(a.amount));
    case 'amount-asc':
      return sorted.sort((a, b) => Number(a.amount) - Number(b.amount));
    case 'title-asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'date-desc':
    default:
      return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
  }
};

export default function Expense({ data, onEdit, onDelete, onDuplicate }) {
  const [filteredYear, setFilteredYear] = useState('');
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('date-desc');
  const [period, setPeriod] = useState('all');

  const filteredExpenses = useMemo(() => {
    let result = data;

    if (period === 'month') {
      result = result.filter((expense) => isSameMonth(expense.date));
    } else if (period === '30') {
      result = result.filter((expense) => isWithinLastDays(expense.date, 30));
    } else if (filteredYear) {
      result = result.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return (
          !isNaN(expenseDate) &&
          expenseDate.getFullYear().toString() === filteredYear
        );
      });
    }

    if (category) {
      result = result.filter((expense) => (expense.category || 'other') === category);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (expense) =>
          expense.title.toLowerCase().includes(q) ||
          (expense.notes || '').toLowerCase().includes(q)
      );
    }

    return sortExpenses(result, sortBy);
  }, [data, filteredYear, category, search, sortBy, period]);

  const filteredTotal = filteredExpenses.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );

  const clearFilters = () => {
    setFilteredYear('');
    setCategory('');
    setSearch('');
    setSortBy('date-desc');
    setPeriod('all');
  };

  const handlePeriodChange = (next) => {
    setPeriod(next);
    if (next !== 'all') setFilteredYear('');
  };

  return (
    <section className="expenses fade-up">
      <div className="expenses__header">
        <h2>Your expenses</h2>
        <p className="expenses__filtered-total">
          Showing <strong>{filteredExpenses.length}</strong> ·{' '}
          {formatCurrency(filteredTotal)}
        </p>
      </div>

      <ExpenseFilter
        year={filteredYear}
        category={category}
        search={search}
        sortBy={sortBy}
        period={period}
        onYearChange={setFilteredYear}
        onCategoryChange={setCategory}
        onSearchChange={setSearch}
        onSortChange={setSortBy}
        onPeriodChange={handlePeriodChange}
        onClear={clearFilters}
      />

      {filteredExpenses.length === 0 ? (
        <div className="expenses__empty">
          <p className="expenses__empty-title">No expenses found</p>
          <p className="expenses__empty-text">
            Try adjusting filters or add a new expense from the Add page.
          </p>
        </div>
      ) : (
        <ul className="expenses__list">
          {filteredExpenses.map((item) => (
            <ExpenseItem
              key={item.id}
              expense={item}
              onEdit={onEdit}
              onDelete={onDelete}
              onDuplicate={onDuplicate}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
