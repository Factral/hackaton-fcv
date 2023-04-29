
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import './stylesAdd.css'
import Auth from './pages/Auth'
import AlertComponent from './components/AlertComponent'

function App () {
  return (
    <>
      <Routes>
        <Route path='/auth' element={<Auth />}>
          <Route path='login' element={<Login />} />
        </Route>
      </Routes>
      <AlertComponent />
    </>
  )
}

export default App
