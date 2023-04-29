import CheckToggle from './CheckToggle'
const mock = {
  img: 'https://www.drogueriascafam.com.co/54345-large_default/acetaminofen-mk-500-mg-caja-con-16-tabletas-cubiertas.jpg',
  info: {
    name: 'Acetaminofen',
    dosis: '1 tableta cada 8 horas'
  }
}

export default function Card ({ img, info }) {
  return (
    <div className='bg-white rounded-lg shadow-lg'>
      <div className='flex items-center justify-between py-4 px-6'>
        <div className='flex gap-3'>
          <div className='rounded-[50%] flex items-center overflow-hidden h-12 w-12 shadow-xl'>
            <img src={mock.img} alt={mock.info.name} />
          </div>
          <div>
            <h2 className='text-xl font-semibold text-gray-800'>{mock.info.name}</h2>
            <p className='text-sm text-gray-500'>{mock.info.dosis}</p>
          </div>
        </div>
        <CheckToggle />
      </div>
    </div>
  )
}
