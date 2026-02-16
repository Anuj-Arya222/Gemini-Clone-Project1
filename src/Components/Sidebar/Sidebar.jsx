import React, { useState, useContext } from 'react';
import './sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context'; 

const Sidebar = () => {
    const [extended, setextended] = useState(false);

    // We now need 'newChat' and 'setinput' from context
    const { 
        onSent, prevPrompts, setRecentPrompt, 
        newChat, // <-- Use the newChat function from context
        setinput 
    } = useContext(Context);


    // --- New Functionality: Loading a past prompt/chat ---
    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt); 
        await onSent(prompt); 
    };

    // --- New Functionality: Handle Clicks on Bottom Icons ---
    const handleBottomItemClick = (message) => {
        newChat(); // Reset the main screen first
        setinput(message); // Set the input field with a helpful message
        console.log(`Sidebar item clicked: ${message}`);
    };


    return (
        <div className='sidebar'>
            <div className="top">
                <img 
                    src={assets.menu_icon} 
                    alt="Menu" 
                    className='menu' 
                    onClick={() => { setextended(prev => !prev); }}
                />

                {/* New Chat Button: Calls the newChat function */}
                <div onClick={newChat} className="new-chat">
                    <img src={assets.plus_icon} alt="New Chat" />
                    {extended ? <p>New Chat</p> : null}
                </div>

                {extended ? (
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        
                        {prevPrompts.map((item, index) => (
                            <div 
                                key={index} 
                                onClick={() => loadPrompt(item)}
                                className="recent-entry"
                            >
                                <img src={assets.message_icon} alt="Message Icon" />
                                <p>{item.slice(0, 18)}...</p> 
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>
            
            <div className="bottom">
                {/* Help Icon */}
                <div 
                    onClick={() => handleBottomItemClick("How can I use Gemini to write code?")}
                    className="bottom-item recent-entry"
                >
                    <img src={assets.question_icon} alt="Help Icon" />
                    {extended ? <p>Help</p> : null}
                </div>
                
                {/* Activity Icon */}
                <div 
                    onClick={() => handleBottomItemClick("Show me my recent chat history.")}
                    className="bottom-item recent-entry"
                >
                    <img src={assets.history_icon} alt="Activity Icon" />
                    {extended ? <p>Activity</p> : null}
                </div>
                
                {/* Settings Icon */}
                <div 
                    onClick={() => handleBottomItemClick("What settings can I change?")}
                    className="bottom-item recent-entry"
                >
                    <img src={assets.setting_icon} alt="Settings Icon" />
                    {extended ? <p>Settings</p> : null}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;