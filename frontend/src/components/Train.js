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
    const [currentMemoList, setCurrentMemoList] = useState([]);
    const [memoList1, setMemoList1] = useState([]);
    const [memoList2, setMemoList2] = useState([]);
    const [memoList3, setMemoList3] = useState([]);
    const [memoList4, setMemoList4] = useState([]);
    const [memoList5, setMemoList5] = useState([]);

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

    const nextCard = async () => {
        await updateCurrentMemoLevel(currentMemoLevel);
        await updateMemoLists();
        console.log("currentMemoList:", currentMemoList);
        console.log("currentMemoLevel:", currentMemoLevel);

        // Pick a random card:
        const randomNumber = Math.floor(Math.random() * currentMemoList.length);
        const randomCard = currentMemoList[randomNumber];

        // Set current card:
        setCurrentCard(randomCard);

        // Set the contents in the front and back card:
        setCurrentQuestion(randomCard.content_1);
        setCurrentAnswer(randomCard.content_2);
    };

    const memoLevelDown = async () => {
        if (currentCard.memo_level > 1) {
            currentCard.memo_level = 1;
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

        // await updateMemoLists();
        nextCard();
    };

    // Function for setting the memo lists lengths:
    const updateMemoLists = () => {
        console.log("updateMemoLists() runs...");

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
        } else if (theLevelIs === "M") {
            setCurrentMemoList(cards);
        }
    };

    const activateMemoLvl = (e) => {
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
            setCurrentMemoLevel(e.target.textContent.charAt(0));
            // Set the current list:
            console.log("current memo list levl:", e.target.textContent.charAt(0));
            const theLevelIs = e.target.textContent.charAt(0);
            updateCurrentMemoLevel(theLevelIs);
            // if (theLevelIs === "1") {
            //     setCurrentMemoList(memoList1);
            // } else if (theLevelIs === "2") {
            //     setCurrentMemoList(memoList2);
            // } else if (theLevelIs === "3") {
            //     setCurrentMemoList(memoList3);
            // } else if (theLevelIs === "4") {
            //     setCurrentMemoList(memoList4);
            // } else if (theLevelIs === "5") {
            //     setCurrentMemoList(memoList5);
            // } else if (theLevelIs === "M") {
            //     setCurrentMemoList(cards);
            // }
            setCurrentQuestion("START ⬇️");
            setCurrentAnswer("START ⬇️");
        }
    };

    return (
        <div className="train-container">
            <button className="btn select-request" onClick={startToSelect}>
                Get Cards!
            </button>
            <h1>Train</h1>
            <div className="select-level-container">
                <div onClick={(e) => activateMemoLvl(e)} className="lvl-btn-container">
                    <button className="btn btn-lvl active-memo-lvl">Mix ({memoListLengthMix})</button>
                    <button className="btn btn-lvl">1 ({memoListLength1})</button>
                    <button className="btn btn-lvl">2 ({memoListLength2})</button>
                    <button className="btn btn-lvl">3 ({memoListLength3})</button>
                    <button className="btn btn-lvl">4 ({memoListLength4})</button>
                    <button className="btn btn-lvl">5 ({memoListLength5})</button>
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
                NEXT
            </button>
            <button onClick={memoLevelUp} className="btn btn-yes">
                ✔️
            </button>
        </div>
    );
};

export default Train;
