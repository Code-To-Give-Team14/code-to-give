import { useState } from 'react'
import HelloWorld from './components/hellowWord'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <HelloWorld />
    </>
  )
}

export default App
