import { useEffect, useState } from "react";
import { useCardsContext } from "../hooks/useCardsContext";

const Train = () => {
    const { cards, dispatch } = useCardsContext();
    const [currentCard, setCurrentCard] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState("START ⬇️");
    const [currentAnswer, setCurrentAnswer] = useState("START ⬇️");
    const [currentMemoLevel, setCurrentMemoLevel] = useState("mix");
    const [memoListLength1, setMemoListLength1] = useState(0);
    const [memoListLength2, setMemoListLength2] = useState(0);
    const [memoListLength3, setMemoListLength3] = useState(0);
    const [memoListLength4, setMemoListLength4] = useState(0);
    const [memoListLength5, setMemoListLength5] = useState(0);
    const [memoListLengthMix, setMemoListLengthMix] = useState(0);
    const [memoList1, setMemoList1] = useState([]);
    const [memoList2, setMemoList2] = useState([]);
    const [memoList3, setMemoList3] = useState([]);
    const [memoList4, setMemoList4] = useState([]);
    const [memoList5, setMemoList5] = useState([]);

    useEffect(() => {
        // (useEffect runs when a component renders)
        // To get all cards:
        const fetchCards = async () => {
            console.log("fetchCards() runs...");
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
        updateMemoLists();
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

    const setTrainingLevel = (e) => {
        setCurrentMemoLevel(e.target.value);
    };

    // Function for setting the memo lists lengths:
    const updateMemoLists = () => {
        console.log("updateMemoListLength() runs...");

        const list1 = cards.filter((val) => {
            return val["memo_level"] === 1;
        });
        const list2 = cards.filter((val) => {
            return val["memo_level"] === 2;
        });
        const list3 = cards.filter((val) => {
            return val["memo_level"] === 3;
        });
        const list4 = cards.filter((val) => {
            return val["memo_level"] === 4;
        });
        const list5 = cards.filter((val) => {
            return val["memo_level"] === 5;
        });
        setMemoList1(list1);
        setMemoList2(list2);
        setMemoList3(list3);
        setMemoList4(list4);
        setMemoList5(list5);
        setMemoListLength1(list1.length);
        setMemoListLength2(list2.length);
        setMemoListLength3(list3.length);
        setMemoListLength4(list4.length);
        setMemoListLength5(list5.length);
        setMemoListLengthMix(cards.length);
    };

    const startToSelect = () => {
        updateMemoLists();
        document.querySelector(".select-request").style.display = "none";
        document.querySelector("select").style.display = "block";
        document.querySelector("select").style.margin = "auto";
    };

    return (
        <div>
            <h1>Train</h1>
            <div className="select-level-container">
                <button className="btn select-request" onClick={startToSelect}>
                    Choose a memo level!
                </button>
                <select onChange={(e) => setTrainingLevel(e)} onClick={updateMemoLists} name="memo_level_option">
                    <option onClick={updateMemoLists}>Choose a memo level!</option>
                    <option value="mix">Memo Level Mix ({memoListLengthMix})</option>
                    <option value="level1">Memo Level 1 ({memoListLength1})</option>
                    <option value="level2">Memo Level 2 ({memoListLength2})</option>
                    <option value="level3">Memo Level 3 ({memoListLength3})</option>
                    <option value="level4">Memo Level 4 ({memoListLength4})</option>
                    <option value="level5">Memo Level 5 ({memoListLength5})</option>
                </select>
            </div>
            {/* <p>Training Memo-Level: {currentMemoLevel}</p> */}
            {/* <p>Card Memo-Level: {currentCard && currentCard.memo_level}</p> */}
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
