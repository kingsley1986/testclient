import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import UserLoginForm from "./Components/Login";
import UserProfile from "./Components/Profile";
import Navbar from "./Components/Navbar"; // Import the Navbar component

function App() {
  return (
    <Router>
      <div className="App">
        {/* Include the Navbar at the top of your app */}
        <Navbar />

        {/* Routes for different pages */}
        <Routes>
          <Route path="/login" element={<UserLoginForm />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
