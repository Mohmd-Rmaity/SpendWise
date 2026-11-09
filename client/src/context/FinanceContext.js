import { createContext,useState, useEffect } from "react";

export const FinanceContext = createContext();

// const intialTranstions = [
// {
//     id:1,
//     title:"Salary",
//     category:"Income",
//     amount:3200,
//     type:"income"
// },
// {
//     id:2,
//     title:"Groceries",
//     category:"Food",
//     amount:120,
//     type:"expense"
// },
// {
//     id:3,
//     title:"Electricity",
//     category:"Bills",
//     amount:85,
//     type:"expense"
// },

// ];

export const FinanceProvider = ({children}) => {

    const[transactions,setTransactions] = useState([]);
    const [budgets,setBudgets] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(()=>{
        try{
        const savedTranstions = localStorage.getItem("spendwise-transactions");
        const savedBudgets = localStorage.getItem("spendwise-budgets");

        if(savedTranstions){
            setTransactions(JSON.parse(savedTranstions));
        }

        
    if (savedBudgets) {
        setBudgets(JSON.parse(savedBudgets));
    }
    } 
    catch(error){
        console.error("Error",error);
    }
        setIsLoaded(true);
    },[]);

    


    useEffect(()=> {
        if(isLoaded){
            localStorage.setItem("spendwise-transactions",JSON.stringify(transactions));
        
           
         localStorage.setItem("spendwise-budgets",JSON.stringify(budgets));
         
        
       
    }

    },[transactions,isLoaded]);


    const [currency, setCurrency] = useState("USD");

    const exchangeRate = 89500;

    const formatAmount = (amount) => {
    const numericAmount = Number(amount);

    if (currency === "LBP") {
        return "ل.ل " + Math.round(numericAmount * exchangeRate).toLocaleString("en-US");
    }

    return "$" + numericAmount.toFixed(2);
};
    
    return(
        <FinanceContext.Provider
            value={{transactions,setTransactions,budgets,setBudgets,currency,setCurrency,formatAmount}}>
                {children}
        </FinanceContext.Provider>
    );
};