import SummaryCard from "../components/SummaryCard";
import { FinanceContext } from "../context/FinanceContext";
import {  useContext } from "react";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

const Dashboard= () => {

    const {transactions,formatAmount} = useContext(FinanceContext);

    let totalIncome = 0;
    let totalExpenses = 0;

    transactions.forEach((transaction) => {
        if(transaction.type === "income"){
            totalIncome = totalIncome +transaction.amount;
        }
        else if (transaction.type === "expense"){
            totalExpenses = totalExpenses + transaction.amount;
        }
    });
    
    const totalBalance = totalIncome - totalExpenses;

    

    const summaryData = [
    { title: "Total Balance", amount: formatAmount(totalBalance) },
    { title: "Total Income", amount: formatAmount(totalIncome) },
    { title: "Total Expenses", amount: formatAmount(totalExpenses) },
    { title: "Savings", amount: formatAmount(totalBalance) }
];

    const lastTransaction = transactions[transactions.length - 1];

   const expenseByCategory = {};

   transactions.forEach((transaction) => {

  const amount = Number(transaction.amount);

  if (
    transaction.type === "expense" &&
    Number.isFinite(amount) &&
    amount > 0
  ) {

    if (expenseByCategory[transaction.category] === undefined) {
      expenseByCategory[transaction.category] = amount;
    }
    else {
      expenseByCategory[transaction.category] =
        expenseByCategory[transaction.category] + amount;
    }

  }
});

const expenseChartData = Object.keys(expenseByCategory).map((category) => ({
  category: category,
  amount: expenseByCategory[category]
}));

  const comparisonChartData = [
    { name: "Income", amount: totalIncome },
    { name: "Expenses", amount: totalExpenses }
  ];

  const CHART_COLORS = [
    "#EF4444", 
    "#3B82F6", 
    "#FACC15",
    "#22C55E", 
    "#F97316" 
  ];
      
    return(
        <div className="dashboard">

           <div className="dashboard-heading">
              <h1>Dashboard</h1>
              <p>Here's your Financial Overview</p>
            </div>  

            <div className="dashboard-summary">
                {summaryData.map((item) => (
                  <SummaryCard
                  key={item.title}
                  title={item.title}
                  amount={item.amount}
                  />
                ))}
            </div>

            <div className="dashboard-charts">

                <div className="chart-card expense-chart">
                       <h2>Expenses by Category</h2>
                       {expenseChartData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                data={expenseChartData}
                                dataKey="amount"
                                nameKey= "category"
                                cx="50%"
                                cy= "50%"
                                innerRadius={65}
                                outerRadius={100}
                                paddingAngle={3}
                                >
                                  {expenseChartData.map((item,index) => (
                                    <Cell
                                    key={item.category}
                                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                                    />
                                  ))}  
                                  </Pie>
                                  
                                  <Tooltip
                                  formatter={(value) => formatAmount(value)}
                                  />
                                  <Legend/>
                            </PieChart>
                                        
                        </ResponsiveContainer>
                       ) :(
                        <p className="chart-empty">No expense data yet. Add an expense to see the breakdown.</p>

                       )

                       }
                </div>
         <div className="chart-card income-expense-chart">

          <h2>Income vs. Expenses</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparisonChartData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip
                 formatter={(value) => formatAmount(value)}
              />

              <Bar dataKey="amount" name="Amount" radius={[6, 6, 0, 0]}>

                <Cell fill="#198754" />
                <Cell fill="#dc3545" />

              </Bar>

            </BarChart>
          </ResponsiveContainer>

        </div>

      
                

            </div>

           <div className="recent-transactions">

                <h2>Recent Transaction</h2>

                {lastTransaction && (
                    <div className="transaction-item">
                        <div>
                            <h3>{lastTransaction.title}</h3>
                            <p>{lastTransaction.category}</p>
                        </div>

                        <div>
                            <p>{formatAmount(lastTransaction.amount)}</p>
                            <p>{lastTransaction.type}</p>
                        </div>

                    </div>
                )}

            </div> 

               
            
        </div>
    )
}

export default Dashboard;