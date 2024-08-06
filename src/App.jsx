import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./Pages/HomePage_screen/HomePage";
import DetailsPage from "./Pages/AboutPage_screen/DetailsPage";
import ContactPage from "./Pages/ContactPage_screen/ContactPage";
import RegisterPage from "./Pages/Auth/RegisterPage_screen/RegisterPage";
import LoginPage from "./Pages/Auth/LoginPage_screen/LoginPage";
import ResetPassword from "./Pages/Auth/ResetPassword/ResetPassword";
import General from "./Pages/VettingPage_screen/General";
import Technical from "./Pages/VettingPage_screen/Technical";
import WelcomePage from "./Pages/VettingPage_screen/welcomePage";
import UserDashboard from "./Pages/Dashboard/userDashboard";
import AnswerQuestions from "./Pages/VettingPage_screen/AnswerQuestions";
import ThankYouPage from "./Pages/VettingPage_screen/ThanYouPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<DetailsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/general" element={<General />} />
        <Route path="/technical" element={<Technical />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/answer" element={<AnswerQuestions />} />
        <Route path="/evaluation" element={<ThankYouPage />} />
      </Routes>
    </Router>
  )
};

export default App;
