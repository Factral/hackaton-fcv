
export default function ListOfTratamients ({ treatments }) {
  if (treatments.length === 0) return <p className='text-center text-2xl'>No hay tratamientos</p>

  return treatments.map((treatment) => {
    console.log({ treatment })
    const { id, name, nutrition, medicines } = treatment
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
          <ul>
            <span className='text-lg'>Estos son los medicamentos que <span className='text-main-green font-medium'>debes tomar:</span></span>
            {medicines.map((medicine, index) => {
              const porcent = `w-[${Math.round((medicine.amount / medicine.quantity) * 100)}%]`
              console.log({ porcent })
              return (
                <div key={index} className='my-3'>
                  <li className='flex flex-col gap-2 my-2'>
                    <div className='flex flex-col w-full gap-1 md:gap-10 md:flex-row'>
                      <p>Medicamento: <span className='text-main-green font-medium'>{medicine.name}</span></p>
                      <p className='hidden md:block'>|</p>
                      <p>Dosis: <span className='text-main-green font-medium'>{medicine.frequency}</span></p>
                      <p className='hidden md:block'>|</p>
                      <p>Cantidad: <span className='text-main-green font-medium'>{medicine.quantity}</span></p>
                    </div>
                    <div>
                      <p>Progeso:</p>
                      <div>
                        <div className='w-full h-1 rounded-full bg-gray-500'><div className={`h-full w-fit ${porcent} rounded-full bg-main-green-300`} /></div>
                        {medicine.amount}/{medicine.quantity}
                      </div>
                    </div>
                  </li>
                  <hr />
                </div>
              )
            })}
          </ul>
        </div>
      </div>
    )
  })
}
