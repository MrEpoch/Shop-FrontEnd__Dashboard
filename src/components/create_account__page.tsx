import { useRef, useState } from "react";
import { CircularProgress, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CreateAccount } from "../API_Requests";

export default function Create_account() {
    
    const nameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const navigate = useNavigate();

    async function New_account() {
        setLoading(true);

        if (nameRef.current === null || passwordRef.current === null) return;

        if (nameRef.current.value.trim() === "") { setLoading(false); setError("Username cannot be empty"); return; }
        if (passwordRef.current.value.trim() === "") { setLoading(false); setError("Password cannot be empty"); return; }
        if (nameRef.current.value.length > 20) { setLoading(false); setError("Username cannot be longer than 20 characters"); return; }
        if (passwordRef.current.value.length > 50) { setLoading(false); setError("Password cannot be longer than 20 characters"); return; }
        if (nameRef.current.value.length < 5) { setLoading(false); setError("Username cannot be shorter than 5 characters"); return; }
        if (passwordRef.current.value.length < 10) { setLoading(false); setError("Password cannot be shorter than 10 characters"); return; }
        
        try {
            await CreateAccount(nameRef.current.value, passwordRef.current.value);
            navigate("/sandwiches");
        } catch (e) { 
            setLoading(false);
            setError("Username already exists");
            return;
        }
            
    }

    return (
        <>
        {loading ? (<div className="loading__container"><CircularProgress /></div>) : 
            (<section className="login__page">
                {error !== "" ? (<Alert severity="error" className="error__auth">{error}</Alert>) : (<></>)}
                <div className="login__page__form">
                    <h1 className="title">Create Account</h1>
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                            <input ref={nameRef} className="input" type="text" placeholder="Name" />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                            <input ref={passwordRef} className="input" type="password" placeholder="Password" />
                        </div>
                    </div>
                    <button className="button is-primary" onClick={New_account}>Log In</button>
                </div>
            </section>
            )
        }
        </>
    )
}
