import { addInventoryRequest, getInventoyRequest } from '../../services/api.js'
import { toast } from 'react-hot-toast'
import { useState } from 'react'

export const useInventary = () => {

    const [ inventary, setInventary ] = useState([])

    const addInventry = async(params) => {
        const res = await addInventoryRequest(params)

        if(res.error) return toast.error(res.error.response.data.error || 'Error to add inventary')

        toast.success(res.data.message || 'Inventary added')
        return getInventoy()
    }

    const getInventoy = async () => {
        const res = await getInventoyRequest()

        if(res.error) return toast.error(res.error.response.data.error || 'Error to get inventary')

        setInventary(res.data.data)
        return res.data.data
    }

  return { 
    addInventry,
    inventary, getInventoy
  }
}
