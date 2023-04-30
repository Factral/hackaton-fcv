import NavbarMovil from './Navbar'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import useGetUser from '../hooks/useGetUser'
import Loading from './Loading'

export default function Layout () {
  // const { loading } = useGetUser()

  // if (loading) return <Loading />

  return (
    <>
      <Header />
      <Outlet />
      <NavbarMovil />
    </>
  )
}
