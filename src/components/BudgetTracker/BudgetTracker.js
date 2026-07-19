import React, { useMemo, useState } from 'react';
import { formatCurrency, isSameMonth } from '../../utils/categories';
import './BudgetTracker.css';

export default function BudgetTracker({ expenses, budget, onBudgetChange }) {
  const [draft, setDraft] = useState(String(budget || ''));
  const [editing, setEditing] = useState(!budget);

  const monthSpent = useMemo(
    () =>
      expenses
        .filter((e) => isSameMonth(e.date))
        .reduce((sum, e) => sum + Number(e.amount), 0),
    [expenses]
  );

  const limit = Number(budget) || 0;
  const pct = limit > 0 ? Math.min((monthSpent / limit) * 100, 100) : 0;
  const remaining = limit - monthSpent;
  const over = limit > 0 && remaining < 0;

  const saveBudget = (e) => {
    e.preventDefault();
    const value = Number(draft);
    if (value > 0) {
      onBudgetChange(value);
      setEditing(false);
    }
  };

  return (
    <section className="budget fade-up" style={{ animationDelay: '0.08s' }}>
      <div className="budget__top">
        <div>
          <h2 className="budget__title">Monthly budget</h2>
          <p className="budget__subtitle">
            {limit > 0
              ? `${formatCurrency(monthSpent)} of ${formatCurrency(limit)} used`
              : 'Set a monthly spending limit to track progress'}
          </p>
        </div>
        {!editing && (
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => {
              setDraft(String(budget || ''));
              setEditing(true);
            }}
          >
            Edit
          </button>
        )}
      </div>

      {editing ? (
        <form className="budget__form" onSubmit={saveBudget}>
          <input
            type="number"
            min="1"
            step="1"
            placeholder="e.g. 1500"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            aria-label="Monthly budget amount"
          />
          <button type="submit" className="btn btn--primary">
            Save budget
          </button>
        </form>
      ) : (
        <>
          <div className="budget__track" aria-hidden="true">
            <div
              className={`budget__fill ${over ? 'budget__fill--over' : ''}`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="budget__meta">
            <span>{pct.toFixed(0)}% used</span>
            <span className={over ? 'budget__over' : ''}>
              {over
                ? `${formatCurrency(Math.abs(remaining))} over`
                : `${formatCurrency(remaining)} left`}
            </span>
          </div>
        </>
      )}
    </section>
  );
}
