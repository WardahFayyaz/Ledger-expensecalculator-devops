import React, { useMemo, useState } from 'react';
import ExpensesChart from '../ExpensesChart/ExpensesChart';
import CategoryBreakdown from '../CategoryBreakdown/CategoryBreakdown';
import {
  CATEGORIES,
  formatCurrency,
  isSameMonth,
  isWithinLastDays,
} from '../../utils/categories';
import './ChartsPage.css';

const PERIODS = [
  { id: 'month', label: 'This month' },
  { id: '30', label: 'Last 30 days' },
  { id: 'all', label: 'All time' },
];

export default function ChartsPage({ data }) {
  const [period, setPeriod] = useState('month');
  const [category, setCategory] = useState('');

  const filteredExpenses = useMemo(() => {
    let result = data;

    if (period === 'month') {
      result = result.filter((expense) => isSameMonth(expense.date));
    } else if (period === '30') {
      result = result.filter((expense) => isWithinLastDays(expense.date, 30));
    }

    if (category) {
      result = result.filter((expense) => (expense.category || 'other') === category);
    }

    return result;
  }, [data, period, category]);

  const total = filteredExpenses.reduce((sum, e) => sum + Number(e.amount), 0);

  return (
    <section className="charts-page fade-up">
      <div className="charts-page__header">
        <div>
          <h2>Spending charts</h2>
          <p>
            {filteredExpenses.length} expenses · {formatCurrency(total)}
          </p>
        </div>
      </div>

      <div className="charts-page__controls">
        <div className="charts-page__periods" role="group" aria-label="Period">
          {PERIODS.map((p) => (
            <button
              key={p.id}
              type="button"
              className={`charts-page__chip ${
                period === p.id ? 'charts-page__chip--active' : ''
              }`}
              onClick={() => setPeriod(p.id)}
            >
              {p.label}
            </button>
          ))}
        </div>
        <select
          className="charts-page__select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Filter by category"
        >
          <option value="">All categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      <div className="charts-page__visuals">
        <div className="charts-page__panel">
          <h3>Monthly bars</h3>
          <ExpensesChart expenses={filteredExpenses} />
        </div>
        <div className="charts-page__panel">
          <CategoryBreakdown
            expenses={filteredExpenses}
            title="By category"
            filterMonth={false}
          />
        </div>
      </div>
    </section>
  );
}
