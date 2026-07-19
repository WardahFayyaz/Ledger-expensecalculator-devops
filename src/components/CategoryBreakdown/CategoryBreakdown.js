import React, { useMemo } from 'react';
import { CATEGORIES, formatCurrency, getCategory, isSameMonth } from '../../utils/categories';
import './CategoryBreakdown.css';

export default function CategoryBreakdown({
  expenses,
  title = 'This month by category',
  filterMonth = true,
}) {
  const rows = useMemo(() => {
    const scoped = filterMonth
      ? expenses.filter((e) => isSameMonth(e.date))
      : expenses;

    const totals = CATEGORIES.map((cat) => ({
      ...cat,
      amount: scoped
        .filter((e) => (e.category || 'other') === cat.id)
        .reduce((sum, e) => sum + Number(e.amount), 0),
    })).filter((row) => row.amount > 0);

    const max = Math.max(...totals.map((r) => r.amount), 1);
    return totals
      .sort((a, b) => b.amount - a.amount)
      .map((row) => ({ ...row, pct: (row.amount / max) * 100 }));
  }, [expenses, filterMonth]);

  if (rows.length === 0) {
    return (
      <section className="breakdown">
        <h2 className="breakdown__title">{title}</h2>
        <p className="breakdown__empty">No spending in this view yet.</p>
      </section>
    );
  }

  return (
    <section className="breakdown">
      <h2 className="breakdown__title">{title}</h2>
      <ul className="breakdown__list">
        {rows.map((row) => {
          const cat = getCategory(row.id);
          return (
            <li key={row.id} className="breakdown__row">
              <div className="breakdown__label">
                <span
                  className="breakdown__dot"
                  style={{ background: cat.color }}
                />
                <span>{cat.label}</span>
                <strong>{formatCurrency(row.amount)}</strong>
              </div>
              <div className="breakdown__bar">
                <div
                  className="breakdown__bar-fill"
                  style={{
                    width: `${row.pct}%`,
                    background: cat.color,
                  }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
