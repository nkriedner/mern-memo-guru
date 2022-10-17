import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import Header from "./Header";
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";
import Train from "./Train";
import CardsList from "./CardsList";
import NotFound from "./NotFound";

const App = () => {
    const { user } = useAuthContext();

    return (
        // To use the BrowserRouter wrap whole app in it
        <BrowserRouter>
            <Header />
            <main>
                {/* Wrap all Route components in Routes component */}
                <Routes>
                    <Route exact path="/" element={user ? <Home /> : <Navigate to="/login" />} />
                    <Route exact path="/home" element={user ? <Home /> : <Navigate to="/login" />} />
                    <Route exact path="/signup" element={!user ? <Signup /> : <Home />} />
                    <Route exact path="/login" element={!user ? <Login /> : <Home />} />
                    <Route exact path="/train" element={user ? <Train /> : <Login />} />
                    <Route exact path="/cards" element={user ? <CardsList /> : <Login />} />
                    {/* Create Route for all other routes */}
                    <Route exact path="/*" element={<NotFound />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
};

export default App;
