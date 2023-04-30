import { useEffect, useState } from 'react'
import useUser from './useUser'

export default function useGetUser () {
  const { getUser } = useUser()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUser()
      .then(() => setLoading(false))
  }, [])

  return { loading }
}
