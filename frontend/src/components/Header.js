import { Link } from "react-router-dom"; // the <Link /> equals the <a> tag

const Header = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/train">Train</Link>
                    </li>
                    <li>
                        <Link to="/cards">Cards</Link>
                    </li>
                    <li>
                        <Link to="/signup">Signup</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
