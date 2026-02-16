// File: src/config/gemini.js

import { GoogleGenAI } from "@google/genai";

// 🔑 VERIFY: Check if the API key is being loaded correctly
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Check if the key is defined (for debugging)
if (!API_KEY) {
    console.error("FATAL ERROR: VITE_GEMINI_API_KEY is not set. Check your .env file and Vite configuration.");
}

// 1. Initialize the client using the new SDK
const ai = new GoogleGenAI({ apiKey: API_KEY });

// The rest of your runChat function...
export async function runChat(prompt, history) {
    try {
        // ... (API call logic)
        const chat = ai.chats.create({
            model: "gemini-2.5-flash", 
            history: history 
        });

        // This line is where the error likely originates if the key is invalid
        const response = await chat.sendMessage({ message: prompt }); 
        
        return {
            text: response.text,
            newHistory: await chat.getHistory() 
        };

    } catch (error) {
        // IMPORTANT: Log the full error from the API call
        console.error("Gemini API Call Failed with Error:", error); 
        
        // Ensure this block always returns an object to prevent destructuring failure in Context.jsx
        return {
            text: "Sorry, the Gemini API failed to respond. Check your API key and network.",
            newHistory: history
        };
    }
}