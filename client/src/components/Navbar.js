import {  useContext } from "react";
import { Link } from "react-router-dom";
import { FinanceContext } from "../context/FinanceContext";


const Navbar = () => {
    const { currency, setCurrency } = useContext(FinanceContext);
    return(
      <header className="navbar">
         <div className="navbar">
            <h1>Welcome!</h1>
        </div>

        <div className="navbar-actions">

  <button
    type="button"
    className={currency === "USD" ? "currency-option active" : "currency-option"}
    onClick={() => setCurrency("USD")}
  >
    USD ($)
  </button>

  <button
    type="button"
    className={currency === "LBP" ? "currency-option active" : "currency-option"}
    onClick={() => setCurrency("LBP")}
  >
    LBP (ل.ل)
  </button>

  <Link to="/Login" className="navbar-login">
    Login
  </Link>

  <Link to="/Signup" className="navbar-signup">
    Sign Up
  </Link>

</div>

      </header>
       
    )
}

export default Navbar;