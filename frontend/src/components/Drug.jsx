import CheckToggle from './CheckToggle'

export default function Card ({ id, name, description, image }) {
  return (
    <div className='bg-white rounded-lg shadow-lg'>
      <div className='flex items-center justify-between py-4 px-6'>
        <div className='flex gap-3'>
          <div className='rounded-[50%] flex items-center overflow-hidden h-12 w-12 shadow-xl'>
            <img src={image} alt={name} />
          </div>
          <div>
            <h2 className='text-xl font-semibold text-gray-800'>{name}</h2>
            <p className='text-sm text-gray-500'>{description}</p>
          </div>
        </div>
        <CheckToggle />
      </div>
    </div>
  )
}
