import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
function App (): JSX.Element {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  )
}

export default App
