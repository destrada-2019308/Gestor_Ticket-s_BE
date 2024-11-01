import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { calcularControlRequest, addControlRequest, getControlRequest, 
  getAllControlRequest, findByRoleRequest, downloadExcelRequest, findByNameRequest } from '../../services/api.js'

export const useControl = () => {

    const [control, setControl] = useState([])
    const [ isControl, setIsControl ] = useState([])
    const [ isResult, setIsResult ] = useState([])
    const [ result, setResult ] = useState([])
    const [ data, setData ] = useState([])

    const [ name, isName ] = useState([])

    const [ allControl, setAllControl ] = useState([])

    const calcularControl = async (params) => {
        
        const res = await calcularControlRequest(params)
        
        if(res.error) return toast.error(res.error.response.data.error || 'Error to calculate control')
 
        toast.success(res.data.message || 'Control calculated')
        setControl(res.data.result2)   
        setIsResult(res.data.resultOP)
    }

    const getControl = async (params) => {
      const res = await getControlRequest(params) 
      if(res.error) return toast.error(res.error.response.data.error || 'Error to get control')

      setIsControl(res.data.data)
      return res.data.data
  }

    const addControl = async(params) => {
        const res = await addControlRequest(params)

        if(res.error) return toast.error(res.error.response.data.error || 'Error to add control')

        toast.success(res.data.message || 'Control added')
        return getControl()
    }

    const findByRole = async(params) => {
      
      const res = await findByRoleRequest(params) 

      if(res.error) return toast.error(res.error.response.data.error || 'Error to get control')
      setResult(res.data.result)
      setData(res.data.find)
       
  }

  const getAllControl = async () => {
    const res = await getAllControlRequest()
    if(res.error) return toast.error(res.error.response.data.error || 'Error to get control')
    setAllControl(res.data.data)
    return res.data.data
}

  const findByName = async (params) => {
    console.log(params)
    const res = await findByNameRequest(params)
    console.log(res)
    
    //if(res.error) return toast.error(res.error.response.data.error || 'Error to get control')
    isName(res.data.data)
    return res.data.data
  }

  const downloadExcel = async () => {
 
      const res = await downloadExcelRequest({responseType: 'blob'})
  
    const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
             
        const link = document.createElement('a');
        link.href = url;
        link.download = `control.xlsx`;  
        document.body.appendChild(link);
        link.click() 
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

    toast.success(`Historial descargado `)
    
     
  }

  return {
    control, 
    calcularControl, 
    addControl, 
    isControl, 
    getControl, 
    isResult, 
    findByRole,
    result, data,
    allControl, 
    getAllControl,
    downloadExcel,
    name,
    findByName
  }
}
