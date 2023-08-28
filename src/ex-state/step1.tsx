import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <button value={count} onClick={() => setCount(count + 1)}>+1</button>
      <p>count: {count}</p>
    </div>
  )
}

export default function App() {
  return (
    <div className="App">
      <Counter />
    </div>
  )
}
