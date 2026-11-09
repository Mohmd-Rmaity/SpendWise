import { useContext,useState } from "react";
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

const Budgets = () => {
   const { budgets,setBudgets,transactions,formatAmount } = useContext(FinanceContext);
   
   const [category, setCategory] = useState("Food");
   const[amount, setAmount] = useState("");

   const addBudget = () =>{
    if(amount === "" || Number(amount)<=0){
        alert("please enter a valid budget amount")
        return;
    }
    const existingBudget = budgets.find(
        (budget) => budget.category === category
    );

    if(existingBudget) {
        alert("This category is already exists.")
        return;
    }
    
    const newBudget = {
        id:Date.now(),
        category:category,
        amount:Number(amount)
    };

    setBudgets([...budgets,newBudget]);
    setAmount("");
   };

   const deleteBudget = (id) => {
    setBudgets(
       budgets.filter((budget) => budget.id !== id)
    );
   };
     
     const today = new Date();
     const currentMonth =
     today.getFullYear() + "-" +
     String(today.getMonth() + 1).padStart(2, "0");

   const getSpent = (category) => {
     let spent = 0;

     transactions.forEach((transaction) => {
        if(
            transaction.type === "expense" && 
            transaction.category === category &&
            transaction.date &&
            transaction.date.startsWith(currentMonth)
        ) {
            spent = spent + transaction.amount; 
        }
     });
      return spent;
   };
   
   const budgetChartData = budgets.map((budget) => ({
    category: budget.category,
    budget: budget.amount,
    spent: getSpent(budget.category)
}));

    return(
        <div className="budgets-page">

            <h1>Budgets</h1>
            <p>Your monthly spending Limits</p>

            <div className="budget-chart-card">

    <h2>Budget vs. Actual Spending</h2>

    {budgetChartData.length > 0 ? (

        <ResponsiveContainer width="100%" height={350}>

            <BarChart
                data={budgetChartData}
                layout="vertical"
                margin={{ left: 20, right: 30 }}
            >

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis type="number" />

                <YAxis
                    type="category"
                    dataKey="category"
                    width={100}
                />

                <Tooltip
                    formatter={(value) => formatAmount(value)}
                />

                <Legend />

                <Bar
                    dataKey="budget"
                    name="Budget"
                    fill="#3B82F6"
                    radius={[0, 5, 5, 0]}
                />

                <Bar
                    dataKey="spent"
                    name="Spent"
                    fill="#EF4444"
                    radius={[0, 5, 5, 0]}
                />

            </BarChart>

        </ResponsiveContainer>

    ) : (
        <p className="budget-chart-empty">
            Create a budget to see your spending comparison.
        </p>
    )}

</div>

            <div className="budget-form">
                <h2>Create a Budget</h2>

                <select
                value = {category}
                onChange={(e)=> setCategory(e.target.value)}
                >
                  <option value="Food">Food</option>
                  <option value="Bills">Bills</option>
                  <option value="Transport">Transport</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Other">Other</option>
                </select>

                <input
                type="number"
                placeholder="Monthly budget amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                />

                <button
                 type="button" onClick={addBudget}                
                >
                 Add Budget
                </button>
            </div>

           <div className="budget-list">
            <h2>Your Budget</h2>

            {budgets.length === 0 ? (
                <p>No budgets created yet.</p>
            ) : (
                budgets.map((budget) => {
                    const spent = getSpent(budget.category);
                    const remaining = budget.amount - spent;
                    const usedPercentage = (spent / budget.amount) * 100;
                    const progressWidth = Math.min(usedPercentage,100);

                    return(
                        <div className="budget-card" key={budget.id}>
                            <h3>{budget.category}</h3>

                           <p>Budget: {formatAmount(budget.amount)}</p>
                           <p>Spent: {formatAmount(spent)}</p>
                           <p>Remaining: {formatAmount(remaining)}</p>

                            <div className="budget-progress">
                                <div
                                className="budget-progress-fill"
                                style={{ width: progressWidth + "%" }}
                                >
                                </div>

                            </div>

                            <p>{usedPercentage.toFixed(0)}% used</p>

                            {remaining < 0 && (
                                <p>
                                    Over budget by {formatAmount(Math.abs(remaining))}
                                </p>
                            )}
                            <button
                            type="button"
                            onClick={()=> deleteBudget(budget.id)}
                            >
                             Delete
                            </button>

                        </div>
                    );
                })
            )
        }

           </div>

        </div>
    )
}

export default Budgets;