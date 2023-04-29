import React from 'react'

export default function Loading () {
  return (
    <div className='w-screen h-screen bg-gray-800 bg-opacity-50 grid fixed left-0 top-0 z-20 place-items-center'>
      <div className='w-20 h-20 border-8 border-l-0 border-main-green-500 rounded-full animate-spin' />
    </div>
  )
}

export function LoadingComponent () {
  return (
    <div className='w-20 h-20 border-4 border-main-green-500 rounded-full animate-spin' />
  )
}
