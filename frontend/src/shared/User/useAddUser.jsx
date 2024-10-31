import { useState } from "react"
import { addUserRequest } from "../../services/api.js"
import { toast } from "react-hot-toast"

export const useAddUser = () => {

    const [ isLoading, setIsLoading ] = useState(false)

    const addUser = async(params) => {
        setIsLoading(true)

        const res = await addUserRequest(params)
        setIsLoading(false)

        if(res.error) return toast.error(res.error.response.data.error || 'Error to add user')

        toast.success(res.data.message || 'User added')
    }

  return {
    
    addUser,
    isLoading

  }
}
