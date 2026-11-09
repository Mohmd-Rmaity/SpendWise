import { Link } from "react-router-dom";

const Sidebar = () => {
    return(
        <div className="sidebar">
            <h1>SpendWise</h1>
            <nav>
                <Link to="/">Dashboard</Link>
                <Link to="/Transactions">Transactions</Link>
                <Link to="/Budgets">Budgets</Link>
                <Link to="/FinancialPlanner">FinancialPlanner</Link>
                <Link to="/About">About</Link>
                <Link to="/ContactUs">Contact Us</Link>
            </nav>
        </div>
    )
}

export default  Sidebar;