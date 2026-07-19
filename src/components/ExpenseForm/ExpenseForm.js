import React, { useEffect, useState } from 'react';
import { CATEGORIES, todayISO } from '../../utils/categories';
import './ExpenseForm.css';

const QUICK_AMOUNTS = [10, 25, 50, 100];

const emptyForm = {
  title: '',
  amount: '',
  date: todayISO(),
  category: 'other',
  notes: '',
};

export default function ExpenseForm({
  onSave,
  editingExpense,
  onCancelEdit,
}) {
  const [inputs, setInputs] = useState(emptyForm);
  const isEditing = Boolean(editingExpense);

  useEffect(() => {
    if (editingExpense) {
      setInputs({
        title: editingExpense.title || '',
        amount: String(editingExpense.amount ?? ''),
        date: editingExpense.date || todayISO(),
        category: editingExpense.category || 'other',
        notes: editingExpense.notes || '',
      });
    } else {
      setInputs({ ...emptyForm, date: todayISO() });
    }
  }, [editingExpense]);

  const updateField = (field) => (e) => {
    setInputs((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!inputs.title.trim() || !inputs.amount || !inputs.date) return;

    const payload = {
      title: inputs.title.trim(),
      amount: Number(inputs.amount),
      date: inputs.date,
      category: inputs.category,
      notes: inputs.notes.trim(),
    };

    if (isEditing) {
      onSave({ ...payload, id: editingExpense.id });
    } else {
      onSave(payload);
    }
    setInputs({ ...emptyForm, date: todayISO() });
  };

  return (
    <form className="expense-form" onSubmit={onSubmitHandler}>
      <div className="expense-form__heading">
        <h2>{isEditing ? 'Edit expense' : 'Add expense'}</h2>
        {isEditing && (
          <button type="button" className="btn btn--ghost" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>

      <div className="expense-form__grid">
        <div className="expense-form__field expense-form__field--wide">
          <label htmlFor="expense-title">Title</label>
          <input
            id="expense-title"
            type="text"
            placeholder="e.g. Grocery run"
            value={inputs.title}
            onChange={updateField('title')}
            required
          />
        </div>

        <div className="expense-form__field">
          <label htmlFor="expense-amount">Amount</label>
          <input
            id="expense-amount"
            type="number"
            min="0.01"
            step="0.01"
            placeholder="0.00"
            value={inputs.amount}
            onChange={updateField('amount')}
            required
          />
          <div className="expense-form__quick">
            {QUICK_AMOUNTS.map((amt) => (
              <button
                key={amt}
                type="button"
                className="expense-form__chip"
                onClick={() => setInputs((prev) => ({ ...prev, amount: String(amt) }))}
              >
                ${amt}
              </button>
            ))}
          </div>
        </div>

        <div className="expense-form__field">
          <label htmlFor="expense-date">Date</label>
          <input
            id="expense-date"
            type="date"
            value={inputs.date}
            onChange={updateField('date')}
            required
          />
        </div>

        <div className="expense-form__field expense-form__field--wide">
          <label htmlFor="expense-category">Category</label>
          <div className="expense-form__cats">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`expense-form__cat ${
                  inputs.category === cat.id ? 'expense-form__cat--active' : ''
                }`}
                style={{ '--cat-color': cat.color }}
                onClick={() => setInputs((prev) => ({ ...prev, category: cat.id }))}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <select
            id="expense-category"
            className="sr-only"
            value={inputs.category}
            onChange={updateField('category')}
            tabIndex={-1}
            aria-hidden="true"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div className="expense-form__field expense-form__field--wide">
          <label htmlFor="expense-notes">Notes (optional)</label>
          <input
            id="expense-notes"
            type="text"
            placeholder="Store, payment method, reminder…"
            value={inputs.notes}
            onChange={updateField('notes')}
            maxLength={120}
          />
        </div>
      </div>

      <div className="expense-form__actions">
        <button type="submit" className="btn btn--primary">
          {isEditing ? 'Save changes' : 'Add expense'}
        </button>
      </div>
    </form>
  );
}
