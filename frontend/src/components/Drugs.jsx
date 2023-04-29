import Card from './Drug'


export default function ListOfCards ({ formula }) {
  return (
    <>
      {formulaMock.length > 0
        ? formulaMock.map(({ id, name, description, image, checked }) => (
          <Card key={id} name={name} description={description} image={image} checked={checked} />
        ))
        : <p className='text-center py-5 text-gray-400'>No tienes medicamentos prescritos</p>}
    </>
  )
}
