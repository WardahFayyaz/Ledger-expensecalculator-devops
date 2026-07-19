import React, { useMemo } from 'react';
import { formatCurrency, getCategory, isSameMonth } from '../../utils/categories';
import './Summary.css';

export default function Summary({ expenses }) {
  const stats = useMemo(() => {
    const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
    const count = expenses.length;
    const average = count ? total / count : 0;

    const thisMonth = expenses
      .filter((e) => isSameMonth(e.date))
      .reduce((sum, e) => sum + Number(e.amount), 0);

    const lastMonthRef = new Date();
    lastMonthRef.setMonth(lastMonthRef.getMonth() - 1);
    const lastMonth = expenses
      .filter((e) => isSameMonth(e.date, lastMonthRef))
      .reduce((sum, e) => sum + Number(e.amount), 0);

    const byCategory = expenses.reduce((acc, e) => {
      const key = e.category || 'other';
      acc[key] = (acc[key] || 0) + Number(e.amount);
      return acc;
    }, {});

    const topCategoryId = Object.keys(byCategory).sort(
      (a, b) => byCategory[b] - byCategory[a]
    )[0];

    const monthDelta = lastMonth === 0 ? null : ((thisMonth - lastMonth) / lastMonth) * 100;

    return {
      total,
      count,
      average,
      thisMonth,
      lastMonth,
      monthDelta,
      topCategory: topCategoryId ? getCategory(topCategoryId).label : '—',
    };
  }, [expenses]);

  const deltaLabel =
    stats.monthDelta === null
      ? 'vs last month'
      : `${stats.monthDelta >= 0 ? '+' : ''}${stats.monthDelta.toFixed(0)}% vs last month`;

  return (
    <section className="summary fade-up" style={{ animationDelay: '0.05s' }}>
      <div className="summary__item summary__item--accent">
        <span className="summary__label">This month</span>
        <strong className="summary__value">{formatCurrency(stats.thisMonth)}</strong>
        <span className="summary__hint">{deltaLabel}</span>
      </div>
      <div className="summary__item">
        <span className="summary__label">All time</span>
        <strong className="summary__value">{formatCurrency(stats.total)}</strong>
      </div>
      <div className="summary__item">
        <span className="summary__label">Expenses</span>
        <strong className="summary__value">{stats.count}</strong>
      </div>
      <div className="summary__item">
        <span className="summary__label">Top category</span>
        <strong className="summary__value summary__value--text">{stats.topCategory}</strong>
      </div>
    </section>
  );
}
