import ExpenseDate from '../ExpenseDate/ExpenseDate';
import { BsPencilSquare, BsTrash, BsFiles } from 'react-icons/bs';
import { formatCurrency, getCategory } from '../../utils/categories';
import './ExpenseItem.css';

export default function ExpenseItem({ expense, onEdit, onDelete, onDuplicate }) {
  const { date, title, amount, category, id, notes } = expense;
  const cat = getCategory(category);

  const handleDelete = () => {
    if (window.confirm(`Delete "${title}"?`)) {
      onDelete(id);
    }
  };

  return (
    <li className="expense-item">
      <ExpenseDate date={date} />
      <div className="expense-item__body">
        <div className="expense-item__meta">
          <h3 className="expense-item__title">{title}</h3>
          <div className="expense-item__tags">
            <span
              className="expense-item__category"
              style={{ '--cat-color': cat.color }}
            >
              {cat.label}
            </span>
            {notes ? <span className="expense-item__notes">{notes}</span> : null}
          </div>
        </div>
        <div className="expense-item__aside">
          <span className="expense-item__price">{formatCurrency(amount)}</span>
          <div className="expense-item__actions">
            <button
              type="button"
              className="btn btn--icon"
              aria-label={`Duplicate ${title}`}
              title="Duplicate"
              onClick={() => onDuplicate(expense)}
            >
              <BsFiles size={16} />
            </button>
            <button
              type="button"
              className="btn btn--icon"
              aria-label={`Edit ${title}`}
              title="Edit"
              onClick={() => onEdit(expense)}
            >
              <BsPencilSquare size={16} />
            </button>
            <button
              type="button"
              className="btn btn--icon btn--danger"
              aria-label={`Delete ${title}`}
              title="Delete"
              onClick={handleDelete}
            >
              <BsTrash size={16} />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
