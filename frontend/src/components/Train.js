import { useEffect, useState } from "react";
import { useCardsContext } from "../hooks/useCardsContext";

const Train = () => {
    const { cards, dispatch } = useCardsContext();
    const [currentQuestion, setCurrentQuestion] = useState("START ⬇️");
    const [currentAnswer, setCurrentAnswer] = useState("START ⬇️");

    // useEffect runs when a component renders:
    // (to get all cards)
    useEffect(() => {
        const fetchCards = async () => {
            const response = await fetch("/api/cards");
            const json = await response.json();

            if (response.ok) {
                // Update context state:
                dispatch({ type: "SET_CARDS", payload: json });
            }
        };

        fetchCards();
    }, []); // the empty array lets it only render once at the beginning

    const toggleCard = (e) => {
        // Toggle 'is-flipped' class on each click:
        document.getElementsByClassName("card-inner")[0].classList.toggle("is-flipped");
    };

    const nextCard = () => {
        console.log("clicked for next card...");

        // Pick a random card:
        const randomNumber = Math.floor(Math.random() * cards.length);
        const randomCard = cards[randomNumber];

        // Set the contents in the front and back card:
        setCurrentQuestion(randomCard.content_1);
        setCurrentAnswer(randomCard.content_2);
    };

    const memoLevelDown = () => {
        console.log("memoLevelDown clicked...");
    };

    const memoLevelUp = () => {
        console.log("memoLevelUp clicked...");
    };

    return (
        <div>
            <h1>Train</h1>
            <div className="card-container">
                <div onClick={(e) => toggleCard(e)} className="card-inner">
                    <div className="card question">{currentQuestion}</div>
                    <div className="card answer">{currentAnswer}</div>
                </div>
            </div>

            {/* NO, NEXT and YES buttons */}
            <button onClick={memoLevelDown} className="btn btn-no">
                ❌
            </button>
            <button onClick={nextCard} className="btn btn-nxt">
                NEXT
            </button>
            <button onClick={memoLevelUp} className="btn btn-yes">
                ✔️
            </button>
        </div>
    );
};

export default Train;
