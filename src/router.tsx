import { Routes, Route, useNavigate } from 'react-router-dom';
import LogIn__page from "./components/login__page.tsx";
import CreateAccount__page from "./components/create_account__page.tsx";
import Sandwich__display from './components/sandwich_display__page.tsx';
import { VerifyToken } from "./API_Requests.ts";
import { ChildrenProp } from "./Types.ts";

export function ProtectRoute({children}: ChildrenProp) {

    const navigate = useNavigate();

    if (!VerifyToken()) navigate("/");

    return (
        <>
            {children}
        </>
    )
    
}

export default function Router() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Sandwich__display/>} />
                <Route path="/sandwiches" element={
                    <ProtectRoute>
                        <Sandwich__display />
                    </ProtectRoute>} 
                    
                    children={
                        <>
                            <Route path="create" element={
                                <>
                                </>
                            } />
                            <Route path="update" element={
                                <>

                                </>
                            } />
                            <Route path="delete" element={
                                <>

                                </>
                            } />
                        </>
                    }
                />
                <Route path="/create_account" element={
                    <ProtectRoute>
                        <CreateAccount__page />
                    </ProtectRoute>} />
            </Routes>
        </>
    )
}



