import { Routes, Route  } from 'react-router-dom';
import LogIn__page from "./components/login__page.tsx";
import CreateAccount__page from "./components/create_account__page.tsx";
import Sandwich__display from './components/sandwich_display__page.tsx';
//import { token_refresh_name } from "./API_Requests.ts";
import { ChildrenProp } from "./Types.ts";
import Create_sandwich__page from './components/create_sandwich__page.tsx';

export function ProtectRoute({children}: ChildrenProp) {

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
                <Route path="/" element={<LogIn__page />} />
                <Route path="/sandwiches" element={
                    <ProtectRoute>
                        <Sandwich__display />
                    </ProtectRoute>} 
                    
                    children={
                        <>
                            <Route path="create" element={
                                <>
                                    <Create_sandwich__page />
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
                <Route path="/add_sandwich" element={
                    <ProtectRoute>
                        <Create_sandwich__page />
                    </ProtectRoute>} />
                <Route path="/create_account" element={
                    <ProtectRoute>
                        <CreateAccount__page />
                    </ProtectRoute>} />
            </Routes>
        </>
    )
}



