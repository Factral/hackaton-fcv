import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App () {
  const [count, setCount] = useState<number>(0)

  return (
    <>
      <h1>Hola mundo</h1>
    </>
  )
}

export default App
