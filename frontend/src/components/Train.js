import { useEffect, useMemo, useState } from "react";
import { useCardsContext } from "../hooks/useCardsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Train = () => {
    const { cards, dispatch } = useCardsContext();
    const { user } = useAuthContext();
    const [currentCard, setCurrentCard] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [currentAnswer, setCurrentAnswer] = useState("");
    const [currentMemoLevel, setCurrentMemoLevel] = useState("");
    const [currentMemoList, setCurrentMemoList] = useState([]);
    const [memoList1, setMemoList1] = useState([]);
    const [memoList2, setMemoList2] = useState([]);
    const [memoList3, setMemoList3] = useState([]);
    const [memoList4, setMemoList4] = useState([]);
    const [memoList5, setMemoList5] = useState([]);

    useEffect(() => {
        // To get all cards:
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
            updateMemoLists(json);
        };

        fetchCards();
    }, [dispatch]); // the empty array lets it only render once at the beginning

    const toggleCard = () => {
        // Toggle 'is-flipped' class on each click:
        document.getElementsByClassName("card-inner")[0].classList.toggle("is-flipped");
    };

    const nextCard = () => {
        // Pick a random card:
        let randomNumber;
        let randomCard;
        if (currentMemoList.length === 0) {
            // If currentMemoList is not set -> use cards (= "Mix")
            noMoreCards();
            return;
        } else {
            // if currentMemoList is set -> use it
            randomNumber = Math.floor(Math.random() * currentMemoList.length);
            randomCard = currentMemoList[randomNumber];

            setCurrentCard(randomCard); // Set current card
            setCurrentQuestion(randomCard.content_1); // Set the content in the front card
            setCurrentAnswer(randomCard.content_2); // Set the content in the back card:
        }

        updateCurrentMemoLevel(currentMemoLevel);
        updateMemoLists();
    };

    const noMoreCards = () => {
        setCurrentCard(null);
        setCurrentQuestion("(No card for this memo level. Choose a different memo level!)");
        setCurrentAnswer("(No card for this memo level. Choose a different memo level!)");
        setCurrentMemoList([]);
    };

    const memoLevelDown = async () => {
        let noCardsLeft = false;

        if (!currentCard) {
            return;
        }

        if (currentCard.memo_level > 1) {
            if (currentMemoList.length == 1) {
                noCardsLeft = true;
            }
            currentCard.memo_level = 1;
        }

        // fetch request to update:
        const response = await fetch("/api/cards/" + currentCard._id, {
            method: "PATCH",
            body: JSON.stringify({ memo_level: currentCard.memo_level }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
        });
        const json = await response.json();

        updateMemoLists(cards);
        updateCurrentMemoLevel(currentMemoLevel);

        if (noCardsLeft) {
            noMoreCards();
        } else {
            nextCard();
        }
    };

    const memoLevelUp = async () => {
        let noCardsLeft = false;

        if (!currentCard) {
            return;
        }

        if (currentCard.memo_level < 5) {
            if (currentMemoList.length == 1) {
                noCardsLeft = true;
            }
            currentCard.memo_level++;
        }

        // fetch request to update:
        const response = await fetch("/api/cards/" + currentCard._id, {
            method: "PATCH",
            body: JSON.stringify({ memo_level: currentCard.memo_level }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
        });
        const json = await response.json();

        updateMemoLists(cards);
        updateCurrentMemoLevel(currentMemoLevel);

        if (noCardsLeft) {
            noMoreCards();
        } else {
            nextCard();
        }
    };

    // Function for setting the memo lists lengths:
    const updateMemoLists = (memoLists) => {
        if (!memoLists) {
            memoLists = cards;
        }

        const list1 = memoLists.filter((val) => {
            return val["memo_level"] === 1;
        });
        const list2 = memoLists.filter((val) => {
            return val["memo_level"] === 2;
        });
        const list3 = memoLists.filter((val) => {
            return val["memo_level"] === 3;
        });
        const list4 = memoLists.filter((val) => {
            return val["memo_level"] === 4;
        });
        const list5 = memoLists.filter((val) => {
            return val["memo_level"] === 5;
        });
        setMemoList1(list1);
        setMemoList2(list2);
        setMemoList3(list3);
        setMemoList4(list4);
        setMemoList5(list5);
    };

    const updateCurrentMemoLevel = (theLevelIs) => {
        if (theLevelIs === "1") {
            setCurrentMemoList(memoList1);
        } else if (theLevelIs === "2") {
            setCurrentMemoList(memoList2);
        } else if (theLevelIs === "3") {
            setCurrentMemoList(memoList3);
        } else if (theLevelIs === "4") {
            setCurrentMemoList(memoList4);
        } else if (theLevelIs === "5") {
            setCurrentMemoList(memoList5);
        } else {
            setCurrentMemoList(cards);
        }
    };

    const activateMemoLvl = (e) => {
        setCurrentCard(null);
        // If clicked on a btn-lvl:
        if (e.target.classList.contains("btn-lvl")) {
            // Delete the active-memo-lvl from all btn-lvl buttons:
            const buttons = document.getElementsByClassName("btn-lvl");
            for (let i = 0; i < buttons.length; i++) {
                if (buttons[i].classList.contains("active-memo-lvl")) {
                    buttons[i].classList.remove("active-memo-lvl");
                }
            }
            e.target.classList.add("active-memo-lvl");
            setCurrentMemoLevel(e.target.textContent.charAt(5));
            // Set the current list:
            const theLevelIs = e.target.textContent.charAt(5);
            updateCurrentMemoLevel(theLevelIs);

            // nextCard();
            setCurrentQuestion("START ⬇️");
            setCurrentAnswer("START ⬇️");
        }
    };

    return (
        <div className="train-container">
            <h1>Train</h1>
            {!currentMemoLevel && <p className="choose-memo-level">Choose a memo level to train!</p>}
            {currentMemoLevel && <p className="choose-memo-level cml-2">Click start / next to train!</p>}
            <div className="select-level-container">
                <div onClick={(e) => activateMemoLvl(e)} className="lvl-btn-container">
                    <button className="btn btn-lvl">
                        All cards <span>({cards && cards.length})</span>
                    </button>
                    <button className="btn btn-lvl">
                        Memo 1 <span>({memoList1.length})</span>
                    </button>
                    <button className="btn btn-lvl">
                        Memo 2 <span>({memoList2.length})</span>
                    </button>
                    <button className="btn btn-lvl">
                        Memo 3 <span>({memoList3.length})</span>
                    </button>
                    <button className="btn btn-lvl">
                        Memo 4 <span>({memoList4.length})</span>
                    </button>
                    <button className="btn btn-lvl">
                        Memo 5 <span>({memoList5.length})</span>
                    </button>
                </div>
            </div>

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
                {!currentCard && "START"}
                {currentCard && "NEXT"}
            </button>
            <button onClick={memoLevelUp} className="btn btn-yes">
                ✔️
            </button>
        </div>
    );
};

export default Train;
