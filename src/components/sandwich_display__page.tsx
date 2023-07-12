import "./dashboard.css";
import { DeleteSandwich, GetSandwiches, LogOut } from "../API_Requests";
import CircularProgress from '@mui/material/CircularProgress';
import { Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import Sandwich__add from "./create_sandwich__page.tsx";
import Sandwich__update from "./update_sandwich__page.tsx";

export const queryClient = new QueryClient();

export default function Sandwich__display() {

    const {isLoading, error, data } = useQuery<any[], Error>('sandwiches', GetSandwiches, {
        staleTime: 1000 * 60 * 60,
    });

    const navigate = useNavigate();

    async function Handle_log_out() {
        try {
            await LogOut();
            navigate("/");
        } catch (e) {
            console.log(e);
        }
    }

    async function handle_delete_sandwich(sandwich_id: string) {
        try {
            const deleted_sandwich = await DeleteSandwich(sandwich_id);
            console.log(deleted_sandwich);
        } catch (e) {
            console.log(e);
        }
    }

    if (isLoading) {
        return (
            <div className="loading__container">
                <CircularProgress />
            </div>
        )
    }

    if (data) {
        console.log(data);
    }

    return (
        <QueryClientProvider client={queryClient}>
            {isLoading ? (<div className="loading__container"><CircularProgress /></div>) :
                (<section className="sandwich__display__page">
                    <nav className="level sandwich__display__page_navbar">
                        <Sandwich__add />
                        <Sandwich__update sandwiches={data ? data : []} />
                      <p className="level-item has-text-centered">
                        <img src="https://front-end-shop.pages.dev/assets/WoRZX-86840da7.png" alt="" style={{height: "100px"}} />
                      </p>
                      <p className="level-item has-text-centered">
                        <Link to="/create_account" className="link is-info button main-button__color ">Create new admin Account</Link>
                      </p>
                      <p className="level-item has-text-centered">
                        <button onClick={Handle_log_out} className="button is-primary">Log Out</button>
                      </p>
                    </nav>
                    <div className="sandwich__display__page__sandwiches">
                        {data && data.map((sandwich: any, index) => {
                            return (
                                <div key={index} className="sandwich__display__page__container__sandwich">
                                    <div className="sandwich__display__page__container__sandwich__image">
                                        <img src={sandwich.image} alt="" />
                                    </div>
                                    <div className="sandwich__display__page__container__sandwich__name">{sandwich.name}</div>
                                    <div className="sandwich__display__page__container__sandwich__description">{sandwich.description}</div>
                                    <div className="sandwich__display__page__container__sandwich__price">${sandwich.price}</div>
                                    <button onClick={() => handle_delete_sandwich(sandwich.id)} className="button is-primary">delete</button>
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
