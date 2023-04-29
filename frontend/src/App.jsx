
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Formula from './pages/Formula'

function App () {
  return (
    <>
      <Routes>
        <Route path='/' element={<Formula />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  )
}

export default App
