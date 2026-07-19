# Ledger · Expense Calculator

A simple React expense tracker with categories, charts, budgets, and local storage.

## Features

- **Overview** — spending summary, monthly budget, category breakdown  
- **Charts** — monthly bars and category charts  
- **Add** — create or edit expenses (notes, quick amounts, categories)  
- **Expenses** — search, filter, sort, edit, delete, and duplicate  
- Dark / light theme and CSV export  
- Data saved in the browser (`localStorage`)

## Run locally

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
```

## Run with Docker

```bash
docker build -t expense-calculator .
docker run -p 3000:80 expense-calculator
```

Then open [http://localhost:3000](http://localhost:3000).
