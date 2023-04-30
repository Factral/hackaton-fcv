import { useEffect, useRef, useState } from 'react'
import { Socket, io } from 'socket.io-client'
import IconButton from '../components/IconButton'
import { SendIcon } from '../components/Icons'
import transformHours from '../logic/transformHours'
import Message from '../components/Message'
import { LoadingComponent } from '../components/Loading'
import UserStore from '../store/UserStore'
import { shallow } from 'zustand/shallow'
import { useParams } from 'react-router-dom'

const sockect = io('http://localhost:3000')

function getDate () {
  return new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })
}

export default function MyChat () {
  const { destinatario } = useParams()
  const ref = useRef(null)
  const [isConnected, setIsConnected] = useState(false)
  const [last, setLast] = useState(null)
  const [mensaje, setMensaje] = useState('')
  const [mensajes, setMensajes] = useState([])
  const { user } = UserStore(state => state, shallow)

  sockect.on('connect', () => {
    setIsConnected(true)
  })
  const getMessages = (conversacion) => {
    console.log('Render dese la conversacion')
    setMensajes(conversacion.mensajes)
  }
  sockect.on('obtener_conversacion', getMessages)

  useEffect(() => {
    sockect.emit('obtener_conversacion', { userId: user.id, destinatario })
    return () => {
      sockect.off('connect')
      sockect.off('obtener_conversacion')
    }
  }, [])

  useEffect(() => {
    ref.current.scrollTop = ref.current.scrollHeight - ref.current.clientHeight
    if (last) {
      setMensajes(mensajes => [...mensajes, last])
      setLast(null)
    }
  }, [mensajes])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!mensaje.trim()) return
    const mensajeEnviar = {
      userName: user.name,
      userId: user.id,
      destinatario,
      mensaje,
      fecha: getDate(),
      hora: transformHours()
    }
    sockect.emit('mensaje', mensajeEnviar)
    sockect.emit('obtener_conversacion', { userId: user.id, destinatario })
    setLast(mensajeEnviar)
    setMensaje('')
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
              <Message key={mensaje._id} message={mensaje} />
            ))}
          </div>
          <form onSubmit={handleSubmit} className='flex relative'>
            <textarea name='' id='' onKeyDown={(e) => handleInput(e)} onChange={(e) => setMensaje(e.target.value)} value={mensaje} rows='1' className='w-full outline-none rounded-md resize-none py-3 pl-6 pr-[52px] min-h-[10px] text-lg font-medium clean-scroll' />
            <IconButton className='absolute right-1 top-1/2 -translate-y-1/2 p-2 bg-main-green-50 bg-opacity-40 flex items-center justify-center rounded-lg hover:scale-100 hover:bg-opacity-70' icon={<SendIcon />} type='submit' />
          </form>
        </div>
      </div>
    </div>
  )
}
