import React, {useEffect, useState} from "react";
import { Link, useNavigate} from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading){
            return;
        }
        if (user) navigate("/dashboard");        
    }, [user, loading]);

    return (
        <div className = "login">
            <div className = "login_container">
                <input
                  type = "text"
                  className = "login_textBox"
                  value = {email}
                  onChange = {(e) => setEmail(e.target.value)}
                  placeholder = "E-mail Address"
                />
                <input
                  type = "password"
                  className = "login_textBox"
                  value = {password}
                  onChange = {(e) => setPassword(e.target.value)}
                  placeholder = "Password"
                />
                <button
                    className = "login_btn"
                    onClick = {() => logInWithEmailAndPassword(email, password)}
                >
                    Login
                </button>
                <div>
                    <p>Or</p>
                </div>
                <button
                    className = "login_btn login_google"
                    onClick = { signInWithGoogle }
                >
                    Login with Google
                </button>
                <div>
                    <hr />
                    <Link to="/reset"> Forgot Password</Link>
                </div>
                <div>
                    Don't have an account?
                    <Link to = "/register">Register</Link> now.
                </div>
            </div>
        </div>
    );
}

export default Login;