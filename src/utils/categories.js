export const CATEGORIES = [
  { id: 'food', label: 'Food', color: 'var(--cat-food)' },
  { id: 'transport', label: 'Transport', color: 'var(--cat-transport)' },
  { id: 'shopping', label: 'Shopping', color: 'var(--cat-shopping)' },
  { id: 'bills', label: 'Bills', color: 'var(--cat-bills)' },
  { id: 'entertainment', label: 'Entertainment', color: 'var(--cat-entertainment)' },
  { id: 'other', label: 'Other', color: 'var(--cat-other)' },
];

export const getCategory = (id) =>
  CATEGORIES.find((c) => c.id === id) || CATEGORIES[CATEGORIES.length - 1];

export const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(Number(amount) || 0);

export const STORAGE_KEY = 'expense-calculator-data';
export const BUDGET_KEY = 'expense-calculator-budget';
export const THEME_KEY = 'expense-calculator-theme';

export const todayISO = () => new Date().toISOString().slice(0, 10);

export const isSameMonth = (dateStr, ref = new Date()) => {
  const d = new Date(dateStr);
  return (
    !isNaN(d) &&
    d.getMonth() === ref.getMonth() &&
    d.getFullYear() === ref.getFullYear()
  );
};

export const isWithinLastDays = (dateStr, days) => {
  const d = new Date(dateStr);
  if (isNaN(d)) return false;
  const now = new Date();
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - (days - 1));
  return d >= start && d <= now;
};

export const exportExpensesCsv = (expenses) => {
  const headers = ['Title', 'Amount', 'Date', 'Category', 'Notes'];
  const rows = expenses.map((e) => [
    e.title,
    Number(e.amount).toFixed(2),
    e.date,
    getCategory(e.category).label,
    e.notes || '',
  ]);

  const escape = (cell) => `"${String(cell).replace(/"/g, '""')}"`;
  const csv = [headers, ...rows].map((row) => row.map(escape).join(',')).join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `ledger-expenses-${todayISO()}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};
