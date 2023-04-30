
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Formula from './pages/Formula'
import './stylesAdd.css'
import Auth from './pages/Auth'
import AlertComponent from './components/AlertComponent'
import Register from './pages/Register'
import Layout from './components/Layout'
import MyChat from './pages/MyChat'
import VerifyUserLogued from './security/VerifyUserLogued'
import useCloseAlert from './hooks/useCloseAlert'
import Listchat from './pages/Listchat'
import UserStore from './store/UserStore'

function App () {
  useCloseAlert()
  const { user } = UserStore()
  return (
    <>
      <Routes>
        <Route path='/auth' element={<VerifyUserLogued userNeedLogued={false}><Auth /></VerifyUserLogued>}>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>
        <Route path='/' element={<VerifyUserLogued><Layout /></VerifyUserLogued>}>
          <Route path='home' element={<Formula />} />
          <Route path='chat' element={<Listchat />} />
          <Route path='chat/:destinatario' element={<MyChat />} />
        </Route>
      </Routes>
      <AlertComponent />
    </>
  )
}

export default App
