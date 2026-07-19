import './ExpenseDate.css';

export default function ExpenseDate({ date }) {
  const newDate = new Date(date);
  const month = newDate.toLocaleString('en-US', { month: 'short' });
  const day = newDate.toLocaleString('en-US', { day: '2-digit' });
  const year = newDate.getFullYear();

  return (
    <time className="expense-date" dateTime={date}>
      <span className="expense-date__day">{day}</span>
      <span className="expense-date__month">{month}</span>
      <span className="expense-date__year">{year}</span>
    </time>
  );
}
