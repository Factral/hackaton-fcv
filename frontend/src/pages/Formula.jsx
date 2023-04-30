import ListOfTratamients from '../components/ListOfTratamients'
import AddMedicineButton from '../components/AddMedicine'
import treatments from '../api/treatments'
import UserStore from '../store/UserStore'

export default function Formula () {
  const { user } = UserStore()
  return (
    <>
      <h2 className='text-4xl text-center flex flex-col my-10 mx-1'>Bienvenido <strong>{user.name}</strong></h2>
      <ListOfTratamients treatments={treatments} />
      <AddMedicineButton />
    </>
  )
}
