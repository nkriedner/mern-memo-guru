import { useState } from "react";

const CardForm = () => {
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
        }
    };

    return (
        <div>
            <h2>Add a new card</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="content_1">Content 1: </label>
                    <input type="text" onChange={(e) => setContent_1(e.target.value)} value={content_1} />
                </div>
                <div>
                    <label htmlFor="content_2">Content 2: </label>
                    <input type="text" onChange={(e) => setContent_2(e.target.value)} value={content_2} />
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
            {/* When an error occurs: */}
            {error && <div className="error-box">{error}</div>}
        </div>
    );
};

export default CardForm;
