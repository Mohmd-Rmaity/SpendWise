import { useContext, useState } from "react";
import { FinanceContext } from "../context/FinanceContext";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const Transactions = () => {

    const {transactions, setTransactions,formatAmount} = useContext(FinanceContext);

    const [title,setTitle] = useState("");
    const [category,setCategory] = useState("");
    const [amount,setAmount] = useState("");
    const [type,setType] = useState("expense");

    const addTransaction = () =>{

        if(title === "" || category === "" || amount === ""){
            alert("Fill in all fields");
            return;
        }

        const today = new Date();

        const transactionDate =
        today.getFullYear() + "-"+
        String(today.getMonth() + 1).padStart(2,"0") + "-" +
        String(today.getDate()).padStart(2,"0");

        const newTransaction = {
            id:Date.now(),
            title:title,
            category:category,
            amount: Number(amount),
            type:type,
            date:transactionDate
        };
        setTransactions([...transactions,newTransaction]);

        setTitle("");
        setCategory("");
        setAmount("");
        setType("expense")
    }

    const deleteTransaction = (id) =>{
       setTransactions(
          transactions.filter((transaction) => transaction.id !== id)
       );
    };

    
const monthlyTotals = {};

transactions.forEach((transaction) => {

  if (!transaction.date) {
    return;
  }

  const month = transaction.date.substring(0, 7);
  const amount = Number(transaction.amount);

  if (!monthlyTotals[month]) {
    monthlyTotals[month] = {
      income: 0,
      expenses: 0
    };
  }

  if (transaction.type === "income") {
    monthlyTotals[month].income =
      monthlyTotals[month].income + amount;
  }
  else if (transaction.type === "expense") {
    monthlyTotals[month].expenses =
      monthlyTotals[month].expenses + amount;
  }

});


const monthlyChartData = Object.keys(monthlyTotals)
  .sort()
  .map((month) => {

    const parts = month.split("-");
    const monthDate = new Date(
      Number(parts[0]),
      Number(parts[1]) - 1
    );

    return {
      month: monthDate.toLocaleString("en-US", {
        month: "short",
        year: "numeric"
      }),
      income: monthlyTotals[month].income,
      expenses: monthlyTotals[month].expenses
    };
  });

    return(
        <div className="transactions-page">
            <h1>Transactions</h1>
            <p>Manage Your Income and Expenses</p>

            <h2>Add Transaction</h2>

             <input
             type="text"
             placeholder="Transaction title"
             value={title}
            onChange={(e) => setTitle(e.target.value)}
             />
             
             <input
             type="text"
             placeholder="Category"
             value={category}
             onChange={(e) => setCategory(e.target.value)}
             />

             <input
             type="number"
             placeholder="amount"
             value={amount}
             onChange={(e) => setAmount(e.target.value)}

             />
             <select
             value={type}
             onChange={(e) => setType(e.target.value)}
             >
                <option value="income">Income</option>
                <option value="expense">Expense</option>

             </select>

             <button onClick={addTransaction}> Add Transaction</button>
             

             {transactions.map((transaction)=>(

                <div className="transaction-item" key={transaction.id}>
                    
                    <h3>{transaction.title}</h3>

                    <p>{transaction.category}</p>

                    <p>{formatAmount(transaction.amount)}</p>

                    <p>{transaction.type}</p>

                    <button onClick={() => deleteTransaction(transaction.id)}>Delete</button>

                </div>
             ))}  

            {/* Monthly Income and Expenses Chart */}
<div className="monthly-chart-card">

  <h2>Monthly Income vs. Expenses</h2>

  {monthlyChartData.length > 0 ? (

    <ResponsiveContainer width="100%" height={320}>

      <BarChart data={monthlyChartData}>

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="month" />

        <YAxis />

        <Tooltip
          formatter={(value) => formatAmount(value)}
        />

        <Legend />

        <Bar
          dataKey="income"
          name="Income"
          fill="#22C55E"
          radius={[5, 5, 0, 0]}
        />

        <Bar
          dataKey="expenses"
          name="Expenses"
          fill="#EF4444"
          radius={[5, 5, 0, 0]}
        />

      </BarChart>

    </ResponsiveContainer>

  ) : (
    <p className="monthly-chart-empty">
      No monthly transaction data available yet.
    </p>
  )}

</div>

        </div>
    )
}

export default Transactions;