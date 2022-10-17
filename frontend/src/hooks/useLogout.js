import { useAuthContext } from "./useAuthContext";
import { useCardsContext } from "./useCardsContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const { dispatch: cardsDispatch } = useCardsContext();

    const logout = () => {
        // Remove user from localstorage
        localStorage.removeItem("user");

        // Dispatch logout action
        dispatch({ type: "LOGOUT" });
        cardsDispatch({ type: "SET_CARDS", payload: null }); // clearing the global cards state
    };

    return { logout };
};
