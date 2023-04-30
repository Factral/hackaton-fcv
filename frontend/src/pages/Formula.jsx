import ListOfTratamients from '../components/ListOfTratamients'
import AddMedicineButton from '../components/AddMedicine'
import treatments from '../api/treatments'

export default function Formula () {
  console.log({ treatments })
  return (
    <>
      <h2 className='text-4xl text-center flex flex-col my-10 mx-1'>Bienvenido <strong>Esteban Villamizar</strong></h2>
      <ListOfTratamients treatments={treatments} />
      <AddMedicineButton />
    </>
  )
}
