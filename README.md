## Getting Started

1. Install all project dependencies:

```bash
npm install
```

2. Run the development server to run project

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Notes

- Used the latest Next JS
- Used [chart.js](https://www.chartjs.org/) for creating pie chart for displaying all cocktails ingredients
- When displaying ingredients, we ignore all ingredients that are not `cup`, `tsp`, `tbsp`, `cl`, `oz`, `part`, `parts`, `dash`
- Used Tailwind to be able to quickly prototype this project
