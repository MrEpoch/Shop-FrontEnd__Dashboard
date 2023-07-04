import { useMemo, useState } from "react"
import { GetSandwiches } from "../API_Requests";
import CircularProgress from '@mui/material/CircularProgress';
import { Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function Sandwich__display() {
    const [sandwiches, setSandwiches] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const navigate = useNavigate();

    function Handle_log_out() {
        localStorage.removeItem("token");
        navigate("/");
    }

    async function LoadSandwiches() {
        setLoading(true);
        try {
            const sandwiches_response = await GetSandwiches();
            setSandwiches(sandwiches_response);
            setLoading(false);
            return;
        } catch (e) {
            setLoading(false);
            setError("Error loading sandwiches");
            return;
        }
    }
    useMemo(() => {
        LoadSandwiches();
    }, []);

    return (
        <>
            {loading ? (<div className="loading__container"><CircularProgress /></div>) :
                (<section className="sandwich__display__page">
                    <nav className="level">
                      <p className="level-item has-text-centered">
                        <Link to="create" className="link is-info button">Add new sandwich</Link>
                      </p>
                      <p className="level-item has-text-centered">
                        <Link to="update" className="link is-info button">Update sandwich</Link>
                      </p>
                      <p className="level-item has-text-centered">
                        <img src="https://front-end-shop.pages.dev/assets/WoRZX-86840da7.png" alt="" style={{height: "100px"}} />
                      </p>
                      <p className="level-item has-text-centered">
                        <Link to="create_account" className="link is-info button">Create new admin Account</Link>
                      </p>
                      <p className="level-item has-text-centered">
                        <button onClick={Handle_log_out} className="button is-primary">Log Out</button>
                      </p>
                    </nav>
                    <div className="sandwich__display__page__sandwiches">
                        {sandwiches.map((sandwich: any) => {
                            return (
                                <div className="sandwich__display__page__container__sandwich">
                                    <div className="sandwich__display__page__container__sandwich__name">{sandwich.name}</div>
                                    <div className="sandwich__display__page__container__sandwich__description">{sandwich.description}</div>
                                    <div className="sandwich__display__page__container__sandwich__price">{sandwich.price}</div>
                                </div>
                            )
                        })}
                    </div>
                    {error !== "" ? (<Alert severity="error" className="error__message">{error}</Alert>) : (<></>)}
                </section>)
            }
        </>
    )
}
