import { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import IconButton from '../components/IconButton'
import { SendIcon } from '../components/Icons'
import transformHours from '../logic/transformHours'
import Message from '../components/Message'
import { MY_ID } from '../constants/magicStrings'

const sockect = io('http://localhost:3000')

// const mockMensajes = [
//   {
//     id: 1,
//     mensaje: 'hola',
//     fecha: '2021-10-10',
//     hora: '10:00'
//   },
//   {
//     id: 2,
//     mensaje: 'hola',
//     fecha: '2021-10-10',
//     hora: '10:00'
//   },
//   {
//     id: 3,
//     mensaje: 'como estas?',
//     fecha: '2021-10-10',
//     hora: '10:00'
//   },
//   {
//     id: 4,
//     mensaje: 'como estas?',
//     fecha: '2021-10-10',
//     hora: '10:00'
//   },
//   {
//     id: 5,
//     mensaje: 'como estas?',
//     fecha: '2021-10-10',
//     hora: '10:00'
//   },
//   {
//     id: 6,
//     mensaje: 'como estas?',
//     fecha: '2021-10-10',
//     hora: '10:00'
//   },
//   {
//     id: 7,
//     mensaje: 'como estas?',
//     fecha: '2021-10-10',
//     hora: '10:00'
//   },
//   {
//     id: 8,
//     mensaje: 'como estas?',
//     fecha: '2021-10-10',
//     hora: '10:00'
//   },
//   {
//     id: 11,
//     mensaje: 'hola',
//     fecha: '2021-10-10',
//     hora: '10:00'
//   },
//   {
//     id: 12,
//     mensaje: 'hola',
//     fecha: '2021-10-10',
//     hora: '10:00'
//   },
//   {
//     id: 13,
//     mensaje: 'como estas?',
//     fecha: '2021-10-10',
//     hora: '10:00'
//   },
//   {
//     id: 14,
//     mensaje: 'como estas?',
//     fecha: '2021-10-10',
//     hora: '10:00'
//   },
//   {
//     id: 15,
//     mensaje: 'como estas?',
//     fecha: '2021-10-10',
//     hora: '10:00'
//   },
//   {
//     id: 16,
//     mensaje: 'como estas?',
//     fecha: '2021-10-10',
//     hora: '10:00'
//   },
//   {
//     id: 17,
//     mensaje: 'como estas?',
//     fecha: '2021-10-10',
//     hora: '10:00'
//   },
//   {
//     id: 18,
//     mensaje: 'como estas?',
//     fecha: '2021-10-10',
//     hora: '10:00'
//   },
//   {
//     id: 112,
//     mensaje: 'hola',
//     fecha: '2021-10-10',
//     hora: '10:00'
//   },
//   {
//     id: 113,
//     mensaje: 'como estas?',
//     fecha: '2021-10-10',
//     hora: '10:00'
//   },
//   {
//     id: 114,
//     mensaje: 'como estas?',
//     fecha: '2021-10-10',
//     hora: '10:00'
//   },
//   {
//     id: 115,
//     mensaje: 'como estas?',
//     fecha: '2021-10-10',
//     hora: '10:00'
//   },
//   {
//     id: 116,
//     mensaje: 'como estas?',
//     fecha: '2021-10-10',
//     hora: '10:00'
//   },
//   {
//     id: 117,
//     mensaje: 'como estas?',
//     fecha: '2021-10-10',
//     hora: '10:00'
//   },
//   {
//     id: 118,
//     mensaje: 'como estas?',
//     fecha: '2021-10-10',
//     hora: '11:00'
//   }
// ]

function getDate () {
  return new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })
}

export default function MyChat () {
  const ref = useRef(null)
  const [isConnected, setIsConnected] = useState(false)
  const [nuevoMensaje, setNuevoMensaje] = useState('')
  const [mensajes, setMensajes] = useState([])

  useEffect(() => {
    ref.current.scrollTop = ref.current.scrollHeight - ref.current.clientHeight
    sockect.on('connect', () => {
      setIsConnected(true)
    })

    sockect.on('mensaje_normal', (message) => {
      setMensajes((mensajes) => [...mensajes, message])
    })

    sockect.on('disconnect', () => {
      setIsConnected(false)
    })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const mensajeEnviar = { id: new Date().getTime(), userId: MY_ID, mensaje: nuevoMensaje, fecha: getDate(), hora: transformHours() }
    sockect.emit('mensaje_normal', mensajeEnviar)
    setNuevoMensaje('')
  }

  const handleInput = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className='p-3'>
      <div className='w-full max-w-4xl bg-gradient-to-tr relative to-main-white-100 rounded-xl from-main-white  h-[calc(100vh-158px)] m-auto p-3'>
        <div className='flex flex-col justify-end h-full'>
          <div className='overflow-y-auto flex flex-col gap-3 clean-scroll show-scroll p-3 mb-2' ref={ref}>
            {mensajes.map((mensaje) => (
              <Message key={mensaje.id} message={mensaje} />
            ))}
          </div>
          <form onSubmit={handleSubmit} className='flex relative'>
            <textarea name='' id='' onKeyDown={(e) => handleInput(e)} onChange={(e) => setNuevoMensaje(e.target.value)} value={nuevoMensaje} rows='1' className='w-full outline-none rounded-md resize-none py-3 pl-6 pr-[52px] min-h-[10px] text-lg font-medium clean-scroll' />
            <IconButton className='absolute right-1 top-1/2 -translate-y-1/2 p-2 bg-main-green-50 bg-opacity-40 flex items-center justify-center rounded-lg hover:scale-100 hover:bg-opacity-70' icon={<SendIcon />} type='submit' />
          </form>
        </div>
      </div>
    </div>
  )
}
