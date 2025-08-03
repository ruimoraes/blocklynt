import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/HomePage";
import TemplateGame from "./games/template/TemplateGame";
import AutomatoGame from "./games/automato/AutomatoGame";
import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games/template" element={<TemplateGame />} />
        <Route path="/games/automato" element={<AutomatoGame   />} />
      </Routes>
    </Router> 
  );
}
