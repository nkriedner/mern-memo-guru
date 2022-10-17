import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

// CREATE SIGNUP HOOK:
export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsloading] = useState(null);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsloading(true);
        setError(null);

        const response = await fetch("/api/user/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const json = await response.json();

        if (!response.ok) {
            setIsloading(false);
            setError(json.error);
        }
        if (response.ok) {
            // Save user to localstorage
            localStorage.setItem("user", JSON.stringify(json));

            // Update the auth context:
            dispatch({ type: "LOGIN", payload: json });

            setIsloading(false);
        }
    };
    return { login, isLoading, error };
};
