import {useState} from "react";
import { Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitted,setSubmitted] = useState(false);

    const handleLogin = (e) =>{
        e.preventDefault();
        setSubmitted(true);
    };

    return(
        <div className="login-page">
           <div className="login-container">

            <h1>Welcome Back!</h1>
            <p>Login to your SpendWise Account.</p>

            <form onSubmit={handleLogin}>

                <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>

            </form>

            {submitted &&(
                <p className="login-success"> You Logged In Successfully!</p>

            )}
            <p>Dont have an account? <Link to="/Signup">Sign Up</Link></p>

           </div>
            
        </div>
    )
}

export default Login;