// File: src/context/context.js

import { createContext, useState } from "react";
// Ensure the case matches your folder structure (e.g., '../config/gemini')
import { runChat } from '../config/gemini'; 

export const Context = createContext();

const ContextProvider = (props) => {
    // State to hold the current user input (from the text box)
    const [input, setinput] = useState("");
    // State to hold the most recent prompt that was SENT to the API
    const [recentPrompt, setRecentPrompt] = useState("");
    // State to store the list of all past user prompts (for history sidebar)
    const [prevPrompts, setPrevPrompts] = useState([]);
    // State to toggle between the welcome screen and the result screen
    const [showResult, setShowResult] = useState(false);
    // State to show a loading spinner while waiting for the API
    const [loading, setLoading] = useState(false);
    // State to store the final, processed AI response text
    const [resultData, setResultData] = useState("");
    // State to maintain the full structured chat history (for multi-turn convos)
    const [chatHistory, setChatHistory] = useState([]);


    const onSent = async (prompt) => {
        // Determine the actual prompt to use: either the prompt passed as an argument,
        // OR the text currently stored in the 'input' state.
        const currentPrompt = prompt !== undefined ? prompt : input;
        
        if (!currentPrompt.trim()) return; // Prevent sending empty prompts

        setResultData('');
        setLoading(true);
        setShowResult(true);
        
        // 1. Update Prompts History
        // If the prompt is coming from the input box, save it to history
        if(prompt === undefined) {
             setPrevPrompts(prev => [...prev, currentPrompt]);
        }
        setRecentPrompt(currentPrompt);
        
        try {
            // 2. Call the API
            // PASS THE CHAT HISTORY state variable to runChat
            const { text, newHistory } = await runChat(currentPrompt, chatHistory);
            
            // 3. Update State with Response
            setResultData(text);
            setChatHistory(newHistory); // Save the new full conversation history
        } catch (error) {
            console.error("Error during API call:", error);
            setResultData("Sorry, a connection error occurred. Please try again.");
        } finally {
            setLoading(false);
            setinput(""); // Clear the input field after sending
        }
    };


    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        recentPrompt, // Renamed from resentprompt for clarity
        setRecentPrompt,
        input,
        setinput,
        showResult,
        loading,
        resultData,
        chatHistory,
        setChatHistory
    };
    
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};
export default ContextProvider;