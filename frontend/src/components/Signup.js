import { useState } from "react";
// import { useSignup } from "../hooks/useSignup";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const { signup, error, isLoading } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("signing up...");
        // console.log(email, password);

        // await signup(email, password);
    };

    return (
        <div>
            <h2>Sign up</h2>
            <form className="signup" onSubmit={handleSubmit}>
                <label>Email</label>
                <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />

                <label>Password</label>
                <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} />

                <button
                    // disabled={isLoading}
                    className="btn"
                >
                    Sign up
                </button>
                {/* {error && <div className="error-box">{error}</div>} */}
            </form>
        </div>
    );
};

export default Signup;
