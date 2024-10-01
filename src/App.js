import logo from "./logo.svg";
import "./App.css";
import UserLoginForm from "./Components/Login";
import UserProfile from "./Components/Profile.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        {/* User routes */}
        <Route path="/login" element={<UserLoginForm />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
