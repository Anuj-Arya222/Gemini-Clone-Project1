import React, { useState } from 'react';
import Sidebar from './Components/Sidebar/Sidebar'
import Login from './Components/Login/Login';
import Mainbar from './Components/Mainbar/Mainbar'

const App = () => {
  // State to track if the user is logged in
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // State to store the logged-in user's name
    const [userName, setUserName] = useState('Anuj'); 

    const handleLogin = (name) => {
        setUserName(name);
        setIsLoggedIn(true);
    };

    if (!isLoggedIn) {
        // Render the Login component if not logged in
        return <Login onLogin={handleLogin} />;
    }
  return (
    <>
      <Sidebar/>
      <Mainbar userName={userName} />
      
    </>
  )
}

export default App
