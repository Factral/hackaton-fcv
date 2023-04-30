
import { useNavigate } from 'react-router-dom'

export default function ListRenderChats ({ list }) {
  const navigate = useNavigate()

  if (!list || list.length === 0) return (<div className='w-full max-w-5xl m-auto my-20 font-semibold text-xl text-center'>No tienes chats</div>)
  return (
    <>
      {list.map((patient) => (
        <div key={patient.id} className='w-full mt-5 max-w-5xl m-auto p-5 shadow-xl hover:bg-main-white transiiton-all ease-in-out duration-300 border-2 cursor-pointer rounded-2xl' onClick={() => navigate(`/chat/${patient.id}`)}>
          <p className='text-xl font-semibold'>{patient.name}</p>
        </div>
      ))}
      <div className='' />
    </>
  )
}
