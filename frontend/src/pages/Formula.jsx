import ListOfTratamients from '../components/ListOfTratamients'
import AddMedicineButton from '../components/AddMedicine'
import UserStore from '../store/UserStore'
import useUser from '../hooks/useUser'
import Loading from '../components/Loading'
import { useEffect, useState } from 'react'

export default function Formula () {
  const { user } = UserStore()
  const { getTreatments } = useUser()

  const [loading, setLoading] = useState(true)
  const [treatments, setTreatments] = useState([])

  useEffect(() => {
    getTreatments(user.cookie)
      .then((data) => {
        console.log(data)
        setLoading(false)
        setTreatments(data)
      })
  }, [])
  return (
    <>
      {loading && <Loading />}
      <h2 className='text-4xl text-center flex flex-col my-10 mx-1'>Bienvenido <strong>{user.name}</strong></h2>
      <div className='w-full max-w-5xl m-auto'>
        <h2 className='text-2xl font-medium p-3'>Estos son tus <span className='text-main-green'>tratamientos</span> activos</h2>
        <ListOfTratamients treatments={treatments} />
      </div>
      <AddMedicineButton />
    </>
  )
}
