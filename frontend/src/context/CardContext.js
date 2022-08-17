import { createContext, useReducer } from "react";

// Create a context for the cards:
export const CardsContext = createContext();

export const cardsReducer = (state, action) => {
    switch (action.type) {
        case "SET_CARDS":
            return {
                cards: action.payload,
            };
        case "CREATE_CARD":
            return {
                cards: [action.payload, ...state.cards], // adds a new card at the beginning and adds the spread rest
            };
        case "DELETE_CARD":
            return {
                cards: state.cards.filter((c) => c._id !== action.payload._id), // keeps all cards that do not equal the payloads card id
            };
        default:
            return state;
    }
};

export const CardsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cardsReducer, {
        cards: null,
    });

    // To update the state object call dispatch() and pass an object as an argument
    // This object should have a type property with a string value that describes in words the change
    // The second property should be the 'payload' which names any data we need to make the change
    // (eg in this case: an array of card objects)
    // eg: dispatch({ type: "CREATE_CARD", payload: [{...}, {...}] });

    return <CardsContext.Provider value={{ ...state, dispatch }}>{children}</CardsContext.Provider>;
};
