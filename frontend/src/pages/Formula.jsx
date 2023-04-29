import Header from '../components/Header'
import ListOfCards from '../components/Drugs'
import Navbar from '../components/Navbar'
import AddMedicineButton from '../components/AddMedicine'

export default function Formula () {
  return (
    <>
      <Header />
      <ListOfCards />
      <Navbar />
      <AddMedicineButton />
    </>
  )
}
