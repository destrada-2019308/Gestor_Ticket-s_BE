import { useState, useEffect } from 'react'
import { useManagements } from '../../../shared/Managements/useManagements'
import { NavbarGerente } from '../../../Components/Gerente/NavbarGerente'
import { Input } from '../../../Components/UI/Input'
import  BtnAdd  from '../../../Components/UI/BtnAdd'
import BtnEdit  from '../../../Components/UI/BtnEdit'
import BtnDelete from '../../../Components/UI/BtnDelete'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import WarningCard from '../../../Components/UI/WarningCard'
import Loading from '../../../Components/Loading/Loading'

export const GerenciasGerente = () => {

  const { getManagements, managements, addManagement, updateManagement, deleteManagement, isLoading } = useManagements()

    const [ showWarning, setShowWarning ] = useState(false)
    const [ managementSelected, setManagementSelected ] = useState(null)

    const [ form, setForm ] = useState({
        nameGerencia: '',
        nameEncargado: '',
        telefonoEncargado: '',
        emailEncargado: '',
        description: ''
    })

    useEffect(() => {
        getManagements()
    }, [])

    const handleDeleteManagement = async(id) => {
        setShowWarning(true)
        setManagementSelected(id)
    }

    const handleOnAcepted = () => {
        deleteManagement(managementSelected)
         setShowWarning(false)
    }

    const handleOnClosed = () => {
        setShowWarning(false)
    }

    const handleOnCanceled = () => {
        setShowWarning(false)
    }

    const cleanInput = () => {
        setForm({
            nameGerencia: '',
            nameEncargado: '',
            telefonoEncargado: '',
            emailEncargado: '',
            description: ''
        })
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        addManagement(form)
        cleanInput()
    }

    const handleOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleOnClick = (params) => {
        setForm({
            codeGerencia: params.codeGerencia,
            nameGerencia: params.nameGerencia,
            nameEncargado: params.nameEncargado,
            telefonoEncargado: params.telefonoEncargado,
            emailEncargado: params.emailEncargado,
            description: params.description
        })
    }

    const updatedManagement = async ( ) => {
        updateManagement(form, form.codeGerencia)
        cleanInput()
    } 

  return (
    <>
     <NavbarGerente/>
        <div>
            <div className="m-4">
                <div className="form-control m-2 p-4">
                    <h4>Agregar Gerencias</h4>
                    <form action="" onSubmit={handleOnSubmit}>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="">Nombre de la Gerencia</label>
                                <Input 
                                    type={"text"} 
                                    name={"nameGerencia"} 
                                    placeholder={"Nombre de la Gerencia"}
                                    required={true}
                                    value={form.nameGerencia}
                                    onChange={handleOnChange}
                                    />
                            </div>
                            <div className="col">
                                <label htmlFor="">Nombre del Encargado</label>
                                <Input 
                                    type={"text"} 
                                    name={"nameEncargado"} 
                                    placeholder={"Nombre del Encargado"} 
                                    required={true}
                                    value={form.nameEncargado} 
                                    onChange={handleOnChange}/>
                            </div>
                            <div></div>
                            <div className="col">
                                <label htmlFor="">Telefono del Encargado</label>
                                <Input 
                                    type={"number"} 
                                    name={"telefonoEncargado"} 
                                    placeholder={"Telefono del Encargado"} 
                                    required={true}
                                    value={form.telefonoEncargado} 
                                    onChange={handleOnChange}/>
                            </div>
                            <div className="col">
                                <label htmlFor="">Email del Encargado </label>
                                <Input 
                                    type={"email"} 
                                    name={"emailEncargado"} 
                                    placeholder={"Email del Encargado"} 
                                    required={true}
                                    value={form.emailEncargado} 
                                    onChange={handleOnChange}/>
                            </div>
                            <div></div>
                            <div className="col">
                                <label htmlFor="">Descripción</label>
                                <Input 
                                    type={"text"} 
                                    name={"description"} 
                                    placeholder={"Descripción"} 
                                    required={true}
                                    value={form.description} 
                                    onChange={handleOnChange}/>
                            </div>
                        </div>
                        <div className="my-4">
                            <div className="btn-group">
                                <BtnAdd name={"Guardar"} />
                                <div className="mx-4">
                                <BtnEdit onClick={updatedManagement}/>
                                </div>
                                
                            </div>
                        </div>
                    </form>
                    <div className="m-4">
                        <div>
                            <h4>Lista de Gerencias </h4>
                            {isLoading ? (
                                <Loading/>
                            ): (
                                <table className="table table-hover border shadow-sm p-3 mb-5 bg-body rounded">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th scope='col'>#</th>
                                            <th scope='col'>Nombre Gerencia</th>
                                            <th scope='col'>Nombre Encargado</th>
                                            <th scope='col'>Telefono Encargado</th>
                                            <th scope='col'>Email Encargado</th>
                                            <th scope='col'>Descripción</th>
                                            <th>Editar</th>
                                            <th>Eliminar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {managements.map((index) => (
                                            <tr key={index.codeGerencia}>
                                                <td>{index.codeGerencia}</td>
                                                <td>{index.nameGerencia}</td>
                                                <td>{index.nameEncargado}</td>
                                                <td>{index.telefonoEncargado}</td>
                                                <td>{index.emailEncargado}</td>
                                                <td>{index.description}</td>
                                                <td>
                                                    <EditIcon onClick={() => handleOnClick(index) }/>
                                                </td>
                                                <td>
                                                    <DeleteIcon onClick={() => handleDeleteManagement(index.codeGerencia) }/>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                    {showWarning && <WarningCard onAcepted={() => handleOnAcepted(form.codeGerencia)} onCanceled={handleOnCanceled} onClosed={handleOnClosed}/>}
                </div>
            </div>
        </div>
    </>
  )
}
