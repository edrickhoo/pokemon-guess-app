import { useState } from "react";
import GameConatiner from "./components/GameContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HighScorePage from "./components/HighScorePage/HighScorePage";
import Nav from "./components/Nav/Nav";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Nav />
      <div className="App justify-center flex items-center h-[100vh]">
        <Routes>
          <Route path="/" element={<GameConatiner />} />
          <Route path="/highscores" element={<HighScorePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
