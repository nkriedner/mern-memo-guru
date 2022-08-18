// import { useState } from "react";

const Train = () => {
    const toggleCard = (e) => {
        console.log("toggle card clicked...");

        // Toggle 'is-flipped' class on eacht click:
        document.getElementsByClassName("card-inner")[0].classList.toggle("is-flipped");
    };

    const nextCard = () => {
        console.log("clicked for next card...");
    };

    return (
        <div>
            <h1>Train</h1>
            <div className="card-container">
                <div onClick={(e) => toggleCard(e)} className="card-inner">
                    <div className="card question">QUESTION</div>
                    <div className="card answer">ANSWER</div>
                </div>
            </div>
            <button onClick={nextCard} className="nxt-btn">
                NEXT
            </button>
        </div>
    );
};

export default Train;
