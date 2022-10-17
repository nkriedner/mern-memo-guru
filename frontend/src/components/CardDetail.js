import { useCardsContext } from "../hooks/useCardsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const CardDetail = ({ card }) => {
    const { dispatch } = useCardsContext();
    const { user } = useAuthContext();

    // Click on the delete button:
    const handleClick = async () => {
        if (!user) {
            return;
        }

        const response = await fetch("/api/cards/" + card._id, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        const json = await response.json();

        if (response.ok) {
            dispatch({ type: "DELETE_CARD", payload: json });
        }
    };

    return (
        <tr>
            <td>{card.content_1}</td>
            <td>{card.content_2}</td>
            <td>{card.memo_level}</td>
            <td onClick={handleClick} title="Delete this card" className="delete-btn">
                X
            </td>
        </tr>
    );
};

export default CardDetail;
