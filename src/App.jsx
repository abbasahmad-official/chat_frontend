import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chatbox from "./Chatbox";

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chatbox />} />
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
