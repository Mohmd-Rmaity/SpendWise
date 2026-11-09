
import { Link } from "react-router-dom";

import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SavingsIcon from "@mui/icons-material/Savings";
import CalculateIcon from "@mui/icons-material/Calculate";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ContactSupportOutlinedIcon from "@mui/icons-material/ContactSupportOutlined";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">

      <div className="footer-content">

        
        <div className="footer-brand">
          <h2 className="footer-logo">
            <AccountBalanceWalletIcon className="footer-brand-icon" />
            SpendWise
          </h2>

          <p>
            Take control of your money and plan your financial future.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>

          <Link to="/" className="footer-link">
            <DashboardIcon className="footer-icon" />
            Dashboard
          </Link>

          <Link to="/Transactions" className="footer-link">
            <ReceiptLongIcon className="footer-icon" />
            Transactions
          </Link>

          <Link to="/Budgets" className="footer-link">
            <SavingsIcon className="footer-icon" />
            Budgets
          </Link>

          <Link to="/FinancialPlanner" className="footer-link">
            <CalculateIcon className="footer-icon" />
            Financial Planner
          </Link>
        </div>

        
        <div className="footer-support">
          <h3>Support</h3>

          <Link to="/About" className="footer-link">
            <InfoOutlinedIcon className="footer-icon" />
            About Us
          </Link>

          <Link to="/ContactUs" className="footer-link">
            <ContactSupportOutlinedIcon className="footer-icon" />
            Contact Us
          </Link>
        </div>

      </div>

      
      <div className="footer-bottom">
        <p>© {currentYear} SpendWise. All rights reserved.</p>
      </div>

    </footer>
  );
};

export default Footer;
