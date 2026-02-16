import React, { useContext } from 'react';
import './Mainbar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';
import ReactMarkdown from 'react-markdown'; 

const Mainbar = ({ userName }) => {
    const { 
        onSent, recentPrompt, showResult, loading, resultData, setinput, input 
    } = useContext(Context);

    // Function to send the prompt when the Send button is clicked
    const handleSendClick = () => {
        if (input.trim() !== "") {
            onSent();
        }
    };
    
    // Function to handle sending a prompt from one of the suggestion cards
    const handleCardClick = (prompt) => {
        onSent(prompt); 
    };

    // Function to handle pressing 'Enter' in the input field
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && input.trim() !== "") {
            onSent();
        }
    };
    
    // --- NEW FUNCTIONALITY ---

    const handleMicClick = () => {
        setinput(""); // Clear input
        console.log("Mic clicked: Ready for voice input.");
    };

    const handleGalleryClick = () => {
        setinput("Describe the image you want the AI to analyze...");
        console.log("Gallery clicked: Waiting for image description.");
    };

    // --- END NEW FUNCTIONALITY ---


    return (
        <div className='main'>
            <div className="nav">
                <p>Aura AI</p>
                <img src={assets.user_icon} alt="User Icon" />
            </div>

            <div className="main-container">
                {showResult ? (
                    <div className="result">
                        <div className="result-title">
                            <img src={assets.user_icon} alt="User Icon" />
                            <p>{recentPrompt}</p> 
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="Gemini Icon" />
                            {loading ? (
                                <div className="loader">
                                    <hr className="animated-hr" />
                                    <hr className="animated-hr" />
                                    <hr className="animated-hr" />
                                </div>
                            ) : (
                                <ReactMarkdown>{resultData}</ReactMarkdown>
                            )}
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="greet">
                            {/* Use the dynamically passed userName here */}
                            <p><span>Hello, {userName}.</span></p> 
                            <p>How can I help you today?</p>
                        </div>
                        <div className="cards">
                            {/* ... (Existing Cards with handleCardClick) ... */}
                            <div onClick={() => handleCardClick("Suggest beautiful places to visit in a tropical location")} className="card"><p>Suggest beautiful places</p><img src={assets.compass_icon} alt="Compass Icon" /></div>
                            <div onClick={() => handleCardClick("Briefly summarize the concept of quantum computing")} className="card"><p>Briefly summarize the concept of...</p><img src={assets.bulb_icon} alt="Bulb Icon" /></div>
                            <div onClick={() => handleCardClick("Brainstorm team bonding activities for a remote team of 10")} className="card"><p>Brainstorm team bonding activities</p><img src={assets.message_icon} alt="Message Icon" /></div>
                            <div onClick={() => handleCardClick("Improve the readability of the following JavaScript function")} className="card"><p>Improve the readability of following code</p><img src={assets.code_icon} alt="Code Icon" /></div>
                        </div>
                    </>
                )}

                {/* --- Main Input Area (Always visible) --- */}
                <div className="main-bottom">
                    <div className="search-box">
                        <input 
                            onChange={(e) => setinput(e.target.value)} 
                            onKeyPress={handleKeyPress} 
                            value={input} 
                            type="text" 
                            placeholder='Enter prompt here' 
                        />
                        <div>
                            {/* Gallery Icon */}
                            <img onClick={handleGalleryClick} src={assets.gallery_icon} alt="Gallery Icon" />
                            {/* Mic Icon */}
                            <img onClick={handleMicClick} src={assets.mic_icon} alt="Mic Icon" />
                            
                            {/* Send Button */}
                            {input ? (
                                <img onClick={handleSendClick} src={assets.send_icon} alt="Send Icon" className='send-active'/>
                            ) : (
                                <img src={assets.send_icon} alt="Send Icon" className='send-inactive'/>
                            )}
                        </div>
                    </div>
                    <p className="bottom-info">
                        Aura AI may display inaccurate info, including about people, so double check its response. Your privacy Aura AI Apps
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Mainbar;