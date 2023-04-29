
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import './stylesAdd.css'

function App () {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  )
}

export default App
