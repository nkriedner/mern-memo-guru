import { useState } from "react";
import { useCardsContext } from "../hooks/useCardsContext";
// import { useCardsContext } from "../hooks/useCardsContext"; // to get access to the dispatch function

const CardForm = () => {
    const { dispatch } = useCardsContext();
    const [content_1, setContent_1] = useState("");
    const [content_2, setContent_2] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevents the default page reload on form submits

        const newCard = { content_1, content_2 }; // destructures the form content into a new card variable

        // Send the response to the backend server:
        const response = await fetch("/api/cards", {
            method: "POST",
            body: JSON.stringify(newCard),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const json = await response.json();

        // If an error occurs set the error state:
        if (!response.ok) {
            console.log("ERROR when submitting card data from form to database:", json.error);
            setError(json.error);
        }
        // If everything worked reset all state variables:
        if (response.ok) {
            setContent_1("");
            setContent_2("");
            setError(null);
            console.log("New card added to database:", json);
            dispatch({ type: "CREATE_CARD", payload: json });
        }
    };

    return (
        <div>
            <h2>Add a new card</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <textarea
                        type="text"
                        onChange={(e) => setContent_1(e.target.value)}
                        value={content_1}
                        placeholder="Englisch"
                    />
                    {/* <input type="text" onChange={(e) => setContent_1(e.target.value)} value={content_1} /> */}
                </div>
                <div>
                    <textarea
                        type="text"
                        onChange={(e) => setContent_2(e.target.value)}
                        value={content_2}
                        placeholder="Deutsch"
                    />
                    {/* <input type="text" onChange={(e) => setContent_2(e.target.value)} value={content_2} /> */}
                </div>
                <div>
                    <button className="btn btn-submit" type="submit">
                        Submit
                    </button>
                </div>
            </form>
            {/* When an error occurs: */}
            {error && <div className="error-box">{error}</div>}
        </div>
    );
};

export default CardForm;
