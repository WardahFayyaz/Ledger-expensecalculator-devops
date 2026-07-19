import React from 'react';
import ExpenseForm from './ExpenseForm';
import './NewExpense.css';

export default function NewExpense({
  onAddExpense,
  onUpdateExpense,
  editingExpense,
  onCancelEdit,
  onSuccess,
}) {
  const handleSave = (data) => {
    if (data.id) {
      onUpdateExpense(data);
    } else {
      onAddExpense(data);
    }
    if (onSuccess) onSuccess();
  };

  return (
    <div className="new-expense fade-up">
      <ExpenseForm
        onSave={handleSave}
        editingExpense={editingExpense}
        onCancelEdit={onCancelEdit}
      />
    </div>
  );
}
