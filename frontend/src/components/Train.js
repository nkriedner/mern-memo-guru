import { useEffect, useState } from "react";
import { useCardsContext } from "../hooks/useCardsContext";

const Train = () => {
    const { cards, dispatch } = useCardsContext();
    const [currentCard, setCurrentCard] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState("START ⬇️");
    const [currentAnswer, setCurrentAnswer] = useState("START ⬇️");

    useEffect(() => {
        // (useEffect runs when a component renders)
        // To get all cards:
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
        // console.log("clicked for next card...");

        // Pick a random card:
        const randomNumber = Math.floor(Math.random() * cards.length);
        const randomCard = cards[randomNumber];

        // Set current card:
        setCurrentCard(randomCard);

        // Set the contents in the front and back card:
        setCurrentQuestion(randomCard.content_1);
        setCurrentAnswer(randomCard.content_2);
    };

    const memoLevelDown = async () => {
        // console.log("memoLevelDown clicked...");

        // console.log("currentCard.memo_level:", currentCard.memo_level);
        if (currentCard.memo_level > 1) {
            currentCard.memo_level = 1;
        }
        // console.log("currentCard.memo_level:", currentCard.memo_level);

        // fetch request to update:
        const response = await fetch("/api/cards/" + currentCard._id, {
            method: "PATCH",
            body: JSON.stringify({ memo_level: currentCard.memo_level }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const json = await response.json();

        nextCard();
    };

    const memoLevelUp = async () => {
        if (currentCard.memo_level < 5) {
            currentCard.memo_level++;
        }

        // fetch request to update:
        const response = await fetch("/api/cards/" + currentCard._id, {
            method: "PATCH",
            body: JSON.stringify({ memo_level: currentCard.memo_level }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const json = await response.json();

        nextCard();
    };

    return (
        <div>
            <h1>Train</h1>
            <p>Memo-Level: {currentCard && currentCard.memo_level}</p>
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
