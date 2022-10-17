import { useEffect } from "react";
import { useCardsContext } from "../hooks/useCardsContext";
import { useAuthContext } from "../hooks/useAuthContext";

import CardForm from "./CardForm";
import CardDetail from "./CardDetail";

const CardsList = () => {
    const { cards, dispatch } = useCardsContext();
    const { user } = useAuthContext();

    // useEffect runs when a component renders:
    useEffect(() => {
        const fetchCards = async () => {
            const response = await fetch("/api/cards", {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            const json = await response.json();

            if (response.ok) {
                // Update context state:
                dispatch({ type: "SET_CARDS", payload: json });
            }
        };

        // Fetch cards if there is a value for the user (= if user is logged in):
        if (user) {
            fetchCards();
        }
    }, [dispatch, user]); // the empty array lets it only render once at the beginning

    return (
        <div>
            <h1>Cards</h1>
            <CardForm />
            <h2>Your Memo Cards</h2>
            <table>
                <thead>
                    <tr>
                        <th>Content 1</th>
                        <th>Content 2</th>
                        <th>Memo Level</th>
                        <th></th>
                    </tr>
                </thead>
                {/* Map through cards and create CardDetail row for every card */}
                <tbody>
                    {cards &&
                        cards.map((card) => {
                            return <CardDetail key={card._id} card={card} />;
                        })}
                </tbody>
            </table>
        </div>
    );
};

export default CardsList;
