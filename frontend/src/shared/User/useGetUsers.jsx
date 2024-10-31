import { useState } from 'react'
import { getUsersRequest } from '../../services/api.js'
import { toast } from 'react-hot-toast'

export const useGetUsers = () => {

    const [ loading, setLoading ] = useState(false)
    const [ user, setUser ] = useState([])

    const getUsers = async () => {
        setLoading(true)

        const res = await getUsersRequest()
        setLoading(false)

        if(res.error) return toast.error(res.error.response.data.error || 'Error to get users')

        setUser(res.data.data)
        return res.data.data
    }

  return {
    getUsers,
    user,
    loading
  }
}
