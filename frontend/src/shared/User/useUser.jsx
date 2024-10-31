import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { getUsersRequest, addUserRequest, updateUserRequest, deleteUserRequest } from '../../services/api.js'

export const useUser = () => {

    const [ isLoading, setIsLoading ] = useState(false)
    const [ user, setUser ] = useState([])

    const getUsers = async () => {
        setIsLoading(true)  

        const res = await getUsersRequest()  
        setIsLoading(false)

        if(res.error) return toast.error(res.error.response.data.error || 'Error to get user')

        setUser(res.data.data)
        return res.data.data
    }

    const addUser = async(params) => {
        setIsLoading(true)  

        const res = await addUserRequest(params)
        setIsLoading(false)

        if(res.error) return toast.error(res.error.response.data.error || 'Error to add user')

        toast.success(res.data.message || 'User added')
        return getUsers()
    } 

    const updateUser = async(params, id) => {
        setIsLoading(true)

        const res = await updateUserRequest(params, id)
        setIsLoading(false)

        if(res.error) return toast.error(res.error.response.data.error || 'Error to update user')

        toast.success(res.data.message || 'User updated')
        return getUsers()
    }

    const deleteUser = async(id) => {
        setIsLoading(true)
        let user = localStorage.getItem('user')
        let userId = JSON.parse(user).codeUser
 
        if(id === userId) {
            toast.error('You can not delete same user')
            return getUsers()
        } 
        const res = await deleteUserRequest(id)
        setIsLoading(false)

        if(res.error) return toast.error(res.error.response.data.error || 'Error to delete user')

        toast.success(res.data.message || 'User deleted')
        return getUsers()
    }

  return {
    getUsers,
    user,
    isLoading,
    addUser,
    updateUser,
    deleteUser
  }
}
