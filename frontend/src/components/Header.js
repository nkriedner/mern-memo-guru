import { Link } from "react-router-dom"; // the <Link /> equals the <a> tag
import { useLogout } from "../hooks/useLogout";
// Delete later ->
import { useAuthContext } from "../hooks/useAuthContext";
// <-

const Header = () => {
    const { logout } = useLogout();
    // Delete later ->
    const { user } = useAuthContext();
    // <-

    const handleClick = () => {
        logout();
    };

    return (
        <header>
            <span>
                <Link to="/">MemoGuru</Link>
            </span>
            <nav>
                <ul>
                    {user && (
                        <li>
                            <Link to="/home">Home</Link>
                        </li>
                    )}
                    {user && (
                        <li>
                            <Link to="/train">Train</Link>
                        </li>
                    )}
                    {user && (
                        <li>
                            <Link to="/cards">Cards</Link>
                        </li>
                    )}
                    {user && (
                        <li>
                            <button className="logout-btn" onClick={handleClick}>
                                {/* Delete later -> */}
                                {/* <span>{user.email}</span> */}
                                {/* <- */}
                                Logout
                            </button>
                        </li>
                    )}
                    {!user && (
                        <>
                            <li>
                                <Link to="/signup">Signup</Link>
                            </li>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
