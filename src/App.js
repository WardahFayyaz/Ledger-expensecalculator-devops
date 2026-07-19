import React, { useEffect, useState } from 'react';
import Expense from './components/Expense/Expense';
import NewExpense from './components/ExpenseForm/NewExpense';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Summary from './components/Summary/Summary';
import BudgetTracker from './components/BudgetTracker/BudgetTracker';
import CategoryBreakdown from './components/CategoryBreakdown/CategoryBreakdown';
import ChartsPage from './components/ChartsPage/ChartsPage';
import PageNav from './components/PageNav/PageNav';
import initialData from './data.json';
import {
  BUDGET_KEY,
  STORAGE_KEY,
  THEME_KEY,
  exportExpensesCsv,
  todayISO,
} from './utils/categories';
import './App.css';

const loadExpenses = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // ignore corrupt storage
  }
  return initialData;
};

const loadBudget = () => {
  try {
    const saved = Number(localStorage.getItem(BUDGET_KEY));
    return saved > 0 ? saved : 0;
  } catch {
    return 0;
  }
};

const loadTheme = () => {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
  } catch {
    // ignore
  }
  return 'light';
};

function App() {
  const [expenses, setExpenses] = useState(loadExpenses);
  const [editingExpense, setEditingExpense] = useState(null);
  const [budget, setBudget] = useState(loadBudget);
  const [theme, setTheme] = useState(loadTheme);
  const [activePage, setActivePage] = useState('overview');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    if (budget > 0) localStorage.setItem(BUDGET_KEY, String(budget));
    else localStorage.removeItem(BUDGET_KEY);
  }, [budget]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const addExpenseHandler = (expenseData) => {
    setExpenses((prev) => [{ ...expenseData, id: `e${Date.now()}` }, ...prev]);
  };

  const updateExpenseHandler = (updated) => {
    setExpenses((prev) =>
      prev.map((item) => (item.id === updated.id ? { ...item, ...updated } : item))
    );
    setEditingExpense(null);
  };

  const deleteExpenseHandler = (id) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
    if (editingExpense?.id === id) setEditingExpense(null);
  };

  const duplicateExpenseHandler = (expense) => {
    const copy = {
      ...expense,
      id: `e${Date.now()}`,
      title: `${expense.title} (copy)`,
      date: todayISO(),
    };
    setExpenses((prev) => [copy, ...prev]);
  };

  const startEditHandler = (expense) => {
    setEditingExpense(expense);
    setActivePage('add');
  };

  const cancelEditHandler = () => {
    setEditingExpense(null);
    setActivePage('expenses');
  };

  const handlePageChange = (page) => {
    if (page !== 'add') setEditingExpense(null);
    setActivePage(page);
  };

  return (
    <div className="app-layout">
      <div className="app-shell">
        <Header
          theme={theme}
          onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
          onExport={() => exportExpensesCsv(expenses)}
        />
        <PageNav activePage={activePage} onChange={handlePageChange} />

        <main className="page-panel" key={activePage}>
          {activePage === 'overview' && (
            <div className="overview-page fade-up">
              <Summary expenses={expenses} />
              <BudgetTracker
                expenses={expenses}
                budget={budget}
                onBudgetChange={setBudget}
              />
              <CategoryBreakdown expenses={expenses} />
            </div>
          )}

          {activePage === 'charts' && <ChartsPage data={expenses} />}

          {activePage === 'add' && (
            <NewExpense
              onAddExpense={addExpenseHandler}
              onUpdateExpense={updateExpenseHandler}
              editingExpense={editingExpense}
              onCancelEdit={cancelEditHandler}
              onSuccess={() => setActivePage('expenses')}
            />
          )}

          {activePage === 'expenses' && (
            <Expense
              data={expenses}
              onEdit={startEditHandler}
              onDelete={deleteExpenseHandler}
              onDuplicate={duplicateExpenseHandler}
            />
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
