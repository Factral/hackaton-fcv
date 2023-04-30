import { shallow } from 'zustand/shallow'
import UserStore from '../store/UserStore'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Listchat () {
  const { user } = UserStore(state => state, shallow)
  const navigate = useNavigate()
  return (
    <>
      {user.patients.map((patient) => (
        <div key={patient.id} className='w-full max-w-5xl m-auto p-5 shadow-xl border-2' onClick={() => navigate(`/chat/${patient.id}`)}>
          <p className='text-xl font-semibold'>{patient.name}</p>
        </div>
      ))}
      <div className='' />
    </>
  )
}
