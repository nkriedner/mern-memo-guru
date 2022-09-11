import { useState } from "react";
// import { useLogin } from "../hooks/useLogin";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const { login, error, isLoading } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("logging in...");

        // await login(email, password);
    };

    return (
        <div>
            <h2>Log in</h2>
            <form className="login" onSubmit={handleSubmit}>
                <label>Email</label>
                <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />

                <label>Password</label>
                <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} />

                <button
                    // disabled={isLoading}
                    className="btn"
                >
                    Log in
                </button>
                {/* {error && <div className="error-box">{error}</div>} */}
            </form>
        </div>
    );
};

export default Login;
