import { useNavigate } from "react-router-dom"
import { loginRequest } from "../../services/api"
import toast from "react-hot-toast"
import { useState } from "react"

export const useLogin = () => {

    const navigate = useNavigate()
    const [ isLoading, setIsLoading ] = useState(false)

    const login = async (params) => {
        setIsLoading(true)

        const res = await loginRequest(params)
        setIsLoading(false)  
        
        if (res.error) return toast.error(res.error.response.data.message || 'Error to login')
    
        toast.success(res.data.message || 'Login success')

        localStorage.setItem('token', res.data.token)
        localStorage.setItem('user', JSON.stringify(res.data.userLoged))
        navigate('/home/macro')

    }

    const logout = () => {
        localStorage.clear()
        navigate('/')
    }

  return{
    login, isLoading, logout
  }
}
