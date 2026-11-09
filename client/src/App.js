import './App.css';
import { BrowserRouter, Route ,Routes  } from 'react-router-dom';
import { FinanceProvider}  from "./context/FinanceContext";

import Footer from './components/Footer';
import MainLayout from './components/MainLayout';


import About from './pages/About';
import Budgets from './pages/Budgets';
import ContactUs from './pages/ContactUs';
import Dashboard from './pages/Dashboard';
import FinancialPlanner from './pages/FinancialPlanner';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Transactions from './pages/Transactions';


function App() {
  return (
    <BrowserRouter>
      
      <FinanceProvider>
      <Routes>
        
        <Route path="/" element={<MainLayout><Dashboard/></MainLayout>} />
        <Route path="/Transactions" element={<MainLayout><Transactions/></MainLayout>} />
        <Route path="/Budgets" element={<MainLayout><Budgets/></MainLayout>} />
        <Route path="/FinancialPlanner" element={<MainLayout><FinancialPlanner/></MainLayout>} />
        <Route path="/ContactUs" element={<MainLayout><ContactUs/></MainLayout>} />
        <Route path="/About" element={<MainLayout><About/></MainLayout>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/Signup" element={<Signup/>} />
      
      
      </Routes>
    </FinanceProvider>
       


    </BrowserRouter>
  );
}

export default App;
