import { useContext, useState } from "react";
import { FinanceContext } from "../context/FinanceContext";

const FinancialPlanner = () => {
  const { transactions, formatAmount, currency, exchangeRate } = useContext(FinanceContext);

  const [itemPrice, setItemPrice] = useState("");
  const [checkedPrice, setCheckedPrice] = useState(null);

  
  let totalIncome = 0;
  let totalExpenses = 0;

  transactions.forEach((transaction) => {
    if (transaction.type === "income") {
      totalIncome = totalIncome + transaction.amount;
    } else if (transaction.type === "expense") {
      totalExpenses = totalExpenses + transaction.amount;
    }
  });

  const availableBalance = totalIncome - totalExpenses;

  const checkAffordability = () => {
    if (itemPrice === "" || Number(itemPrice) <= 0) {
      alert("Please enter a valid item price.");
      return;
    }

    let priceInUSD = Number(itemPrice);

    if (currency === "LBP") {
    priceInUSD = priceInUSD / exchangeRate;
}

setCheckedPrice(priceInUSD);
  };

  const remainingBalance = availableBalance - checkedPrice;

  return (
    <div className="financial-planner">
      <h1>Financial Planner</h1>
      <p>Plan your purchases and make smarter financial decisions.</p>

      <div className="planner-balance">
        <h2>Available Balance</h2>
        <p>{formatAmount(availableBalance)}</p>
      </div>

      <div className="affordability-calculator">
        <h2>Affordability Calculator</h2>

        <label>Enter the price of the item ({currency}):</label>

        <input
          type="number"
          min="0"
          placeholder={"Enter item price in " + currency}
          value={itemPrice}
          onChange={(e) => {
            setItemPrice(e.target.value);
            setCheckedPrice(null);
          }}
        />

        <button onClick={checkAffordability}>
          Check Affordability
        </button>

        {checkedPrice !== null && (
          <div>
            {remainingBalance >= 0 ? (
              <>
                <h3>You can afford this purchase!</h3>
                <p>
                 {formatAmount(remainingBalance)}
                </p>
              </>
            ) : (
              <>
                <h3>You cannot afford this purchase yet.</h3>
                <p>
                  You need an additional: {formatAmount(Math.abs(remainingBalance))}
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialPlanner;