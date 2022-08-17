import { useEffect, useState } from "react";
import CardForm from "./CardForm";
import CardDetail from "./CardDetail";

const Cards = () => {
    const [cardList, setCardList] = useState(null);

    // useEffect runs when a component renders:
    useEffect(() => {
        const fetchCards = async () => {
            const response = await fetch("/api/cards");
            const json = await response.json();

            if (response.ok) {
                console.log("inspirations:", json);
                setCardList(json);
            }
        };

        fetchCards();
    }, []); // the empty array lets it only render once at the beginning
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
                    </tr>
                </thead>
                {/* Map through cardList and create CardDetail row for every card */}
                <tbody>{cardList && cardList.map((card) => <CardDetail key={card._id} card={card} />)}</tbody>
            </table>
        </div>
    );
};

export default Cards;
