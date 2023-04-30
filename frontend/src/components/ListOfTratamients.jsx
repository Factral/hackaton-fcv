
export default function ListOfTratamients ({ treatments }) {
  if (treatments.length === 0) return <p className='text-center text-2xl'>No hay tratamientos</p>
  return treatments.map((treatment) => {
    const { id, name, temps_consommation, nutrition, medicines } = treatment
    const { recommendations } = nutrition[0]
    return (
      <div key={id} className='p-5 bg-white shadow-lg rounded-3xl'>
        <h2 className='font-semibold text-xl'>{name}</h2>
        <div className='flex flex-col gap-3'>
          <div className=''>
            <p className='font-medium text-lg'>Recomendaciones: </p>
            <ul className='flex flex-col gap-2'>
              {recommendations.slice(0, 4).map((recommendation, index) => (
                <li className='text-justify' key={index}>{recommendation}</li>
              ))}
              ...
            </ul>
          </div>
        </div>
      </div>
    )
  })
}
