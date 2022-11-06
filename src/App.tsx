import { useState } from 'react'
import GameConatiner from "./components/GameContainer"


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
     <GameConatiner />
    </div>
  )
}

export default App
