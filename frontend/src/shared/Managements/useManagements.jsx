import {useState} from 'react'
import { toast } from 'react-hot-toast'
import { getManagementsRequest, addManagementRequest, updateManagementRequest, deleteManagementRequest } from '../../services/api.js'

export const useManagements = () => {

    const [ isLoading, setIsLoading ] = useState(false)
    const [ managements, setManagements ] = useState([])

    const getManagements = async () => {
        setIsLoading(true)

        const res = await getManagementsRequest()
        setIsLoading(false)

        if(res.error) return toast.error(res.error.response.data.error || 'Error to get managements')

        setManagements(res.data.data)
        return res.data.data
    }

    const addManagement = async(params) => {
        setIsLoading(true) 

        const res = await addManagementRequest(params)
        setIsLoading(false)

        if(res.error) return toast.error(res.error.response.data.error || 'Error to add management')

        toast.success(res.data.message || 'Management added')
        return getManagements()
    }

    const updateManagement = async(params, id) => {
        setIsLoading(true)

        const res = await updateManagementRequest(params, id)
        setIsLoading(false)

        if(res.error) return toast.error(res.error.response.data.error || 'Error to update management')

        toast.success(res.data.message || 'Management updated')
        return getManagements()
    }

    const deleteManagement = async(id) => {
        setIsLoading(true)

        const res = await deleteManagementRequest(id)
        setIsLoading(false)

        if(res.error) return toast.error(res.error.response.data.error || 'Error to delete management')

        toast.success(res.data.message || 'Management deleted')
        return getManagements()
    }

    return {
        getManagements,
        managements,
        isLoading,
        addManagement,
        updateManagement,
        deleteManagement
    }
}