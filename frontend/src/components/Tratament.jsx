import treatments from '../api/treatments'

export default function Tratament ({ patient }) {
  const { treatment } = patient ?? treatments
  return (
    <div className='max-w-5xl mx-auto'>
      {treatment.length === 0
        ? <p className='text-center text-2xl'>No hay tratamientos</p>
        : null}
    </div>
  )
}
