import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";
import Train from "./Train";
import CardsList from "./CardsList";
import NotFound from "./NotFound";

const App = () => (
    // To use the BrowserRouter wrap whole app in it
    <BrowserRouter>
        <Header />
        <main>
            {/* Wrap all Route components in Routes component */}
            <Routes>
                <Route exact path="/home" element={<Home />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/train" element={<Train />} />
                <Route exact path="/cards" element={<CardsList />} />
                {/* Create Route for all other routes */}
                <Route exact path="/*" element={<NotFound />} />
            </Routes>
        </main>
    </BrowserRouter>
);

export default App;
