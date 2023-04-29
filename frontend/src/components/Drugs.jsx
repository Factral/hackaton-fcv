import useDrugs from '../hooks/useDrugs'
import DrugStore from '../store/DrugStore'
import Card from './Drug'
import { shallow } from 'zustand/shallow'

export default function ListOfCards ({ formula }) {
  const { drugs } = useDrugs()
  console.log(drugs)
  return (
    <>
      {drugs.length > 0
        ? drugs.map(({ id, name, description, image, checked }) => (
          <Card key={id} name={name} description={description} image={image} checked={checked} />
        ))
        : <p className='text-center py-5 text-gray-400'>No tienes medicamentos prescritos</p>}
    </>
  )
}
