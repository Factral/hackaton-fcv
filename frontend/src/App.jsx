
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Formula from './pages/Formula'
import './stylesAdd.css'
import Auth from './pages/Auth'
import AlertComponent from './components/AlertComponent'
import Register from './pages/Register'

function App () {
  return (
    <>
      <Routes>
        <Route path='/auth' element={<Auth />}>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>
        <Route path='/' element={<Formula />} />
      </Routes>
      <AlertComponent />
    </>
  )
}

export default App
