import { useCardsContext } from "../hooks/useCardsContext";

const CardDetail = ({ card }) => {
    const { dispatch } = useCardsContext();

    // Click on the delete button:
    const handleClick = async () => {
        const response = await fetch("/api/cards/" + card._id, {
            method: "DELETE",
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
