import { useState } from "react"
import { GetSandwiches } from "../API_Requests";
import CircularProgress from '@mui/material/CircularProgress';
import { Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import Sandwich__add from "./create_sandwich__page.tsx";

export const queryClient = new QueryClient();

export default function Sandwich__display() {
    const [loading, setLoading] = useState<boolean>(false);

    const {isLoading, error, data } = useQuery<any[], Error>('sandwiches', GetSandwiches);

    const navigate = useNavigate();

    function Handle_log_out() {
        localStorage.removeItem("token");
        navigate("/");
    }

    if (isLoading) {
        return (
            <div className="loading__container">
                <CircularProgress />
            </div>
        )
    }

    return (
        <QueryClientProvider client={queryClient}>
            {loading ? (<div className="loading__container"><CircularProgress /></div>) :
                (<section className="sandwich__display__page">
                    <nav className="level">
                      <p className="level-item has-text-centered">
                        <Sandwich__add />
                      </p>
                      <p className="level-item has-text-centered">
                        <Link to="/sandwiches/update" className="link is-info button">Update sandwich</Link>
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
                        {data && data.map((sandwich: any) => {
                            return (
                                <div className="sandwich__display__page__container__sandwich">
                                    <div className="sandwich__display__page__container__sandwich__name">{sandwich.name}</div>
                                    <div className="sandwich__display__page__container__sandwich__description">{sandwich.description}</div>
                                    <div className="sandwich__display__page__container__sandwich__price">{sandwich.price}</div>
                                </div>
                            )
                        })}
                    </div>
                    {error && (<Alert severity="error" className="error__message">{error.message}</Alert>)}
                </section>)
            }
        </QueryClientProvider>
    )
}
