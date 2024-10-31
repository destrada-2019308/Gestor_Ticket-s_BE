import React, { useState, useEffect } from 'react'
import BtnAdd from '../../../Components/UI/BtnAdd'
import { Input } from '../../../Components/UI/Input'
import BtnDelete from '../../../Components/UI/BtnDelete'
import BtnEdit from '../../../Components/UI/BtnEdit.jsx' 
import Loading from '../../../Components/Loading/Loading'
 
import { toast } from 'react-hot-toast'
import { useUser } from '../../../shared/User/useUser'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import WarningCard from '../../../Components/UI/WarningCard'

export const Users = () => {

    const { getUsers, user, isLoading, addUser, updateUser, deleteUser} = useUser()
    
    const [ showWarning, setShowWarning ] = useState(false)
    const [ userSelected, setUserSelected ] = useState(null)

    const [form, setForm] = useState({
        nameUser: '',
        lastname: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        passwordConfirm: '',
        role: '',
        state: ''
    })

    useEffect(() => {
        getUsers()
    }, [])

    const deletedUser = async(id) => {
        setShowWarning(true)
        setUserSelected(id) 
    }

    const handleOnAcepted = ( ) => {
        console.log('Usuario eliminado')
        deleteUser(userSelected)
        setShowWarning(false)
    }

    const handleOnCanceled = () => {
        console.log('Usuario no eliminado')
        setShowWarning(false)
    }

    const handleOnClosed = () => {
        setShowWarning(false)
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        if(form.password !== form.passwordConfirm) return toast.error("Las contraseñas no coinciden")
        addUser(form)
        cleanInput()
    }

    const handleOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const passwordConfirm = (password, passwordConfirm) =>{
        return password === passwordConfirm
    }

    const validatePass = () =>{
        passwordConfirm(form.password, form.passwordConfirm)
    }

    const cleanInput = () =>{
        setForm({
            nameUser: '',
            lastname: '',
            username: '',
            email: '',
            phone: '',
            password: '',
            passwordConfirm: '',
            role: '',
            state: ''
        })
    }

    const handleOnClick = (user) => {
        setForm({
            codeUser: user.codeUser,
            nameUser: user.nameUser,
            lastname: user.lastname,
            username: user.username,
            email: user.email,  
            passwordConfirm: '',
            phone: user.phone,
            role: user.role,
            state: user.state
        })
    }
    
    const updatedUser = async () => {
         updateUser(form, form.codeUser)
         cleanInput()
    }

    return (
        <div>
            
            <div className="m-4">
                <div className="form-control m-2 p-4">
                    <h4>Agregar Usuarios</h4>

                    <form action="" onSubmit={handleOnSubmit}>

                        <div className='row'>
                            <div className="col">
                                <label htmlFor="">Nombre</label>
                                <Input 
                                    type={"text"} 
                                    placeholder={"Nombre"} 
                                    name={"nameUser"} 
                                    required 
                                    value={form.nameUser} 
                                    onChange={handleOnChange} />
                            </div>
                            <div className="col">
                                <label htmlFor="">Apellido</label>
                                <Input type={"text"} placeholder={"Apellido"} name={"lastname"} required value={form.lastname} onChange={handleOnChange} />
                            </div>
                            <div></div>
                            <div className="col">
                                <label htmlFor="">Username</label>
                                <Input type={"text"} placeholder={"Username"} name={"username"} required value={form.username} onChange={handleOnChange} />
                            </div>
                            <div className="col">
                                <label htmlFor="">Email</label>
                                <Input type={"email"} placeholder={"Email"} name={"email"} required value={form.email} onChange={handleOnChange} />
                            </div>
                            <div></div>
                            
                            <div className="col">
                                <label htmlFor="">Password</label>
                                <Input type={"password"} placeholder={"Password"} name={"password"} required value={form.password} onChange={handleOnChange} />
                            </div> 
                            <div className="col">
                                <label htmlFor="">Repetir Password </label>
                                <Input type={"password"} placeholder={"Repetir Password"} name={"passwordConfirm"} required value={form.passwordConfirm} onChange={handleOnChange} />
                            </div> 
                            <div></div>
                            <div className="col">
                                <label htmlFor="">Teléfono</label>
                                <Input type={"number"} placeholder={"Teléfono"} name={"phone"} required value={form.phone} onChange={handleOnChange} />
                            </div>
                            <div></div>
                            <div className="col">
                                <label htmlFor="">Role</label>
                                <select name="role" id="" className='form-select' key={form.role} value={form.role} required onChange={handleOnChange}>
                                    <option value="">Selecciona un rol</option>
                                    <option value="ADMIN">ADMIN</option>
                                    <option value="GERENTE">GERENTE</option>
                                    <option value="CLIENTE">CLIENTE</option>
                                </select>
                            </div> 
                            <div className="col">
                                <label htmlFor="">Estado</label>
                                <select name="state" id="" className='form-select' key={form.state} value={form.state} required onChange={handleOnChange}>
                                    <option value="">Selecciona el estado </option>
                                    <option value="ACTIVE">ACTIVE</option>
                                    <option value="INACTIVE">INACTIVE</option>
                                </select>
                            </div> 
                            
                            
                        </div> 
                        <div className='my-4'>
                                <div className='btn-group'>
                                <BtnAdd name={"Guardar"} onClick={validatePass}/>
                                <div className='mx-4'>
                                <BtnEdit onClick={updatedUser}/>
                                </div> 
                                </div>
                            </div>
                    </form>
                    
                    <div className='m-4'> 
                        <div  >
                            <h4>Lista de Usuarios <span>(Seleccione una tabla para editar)</span></h4>
                            {isLoading ? (
                                <Loading />
                            ) : (
                                <table className="table table-hover  border shadow-sm p-3 mb-5 bg-body rounded">
                                    <thead className='thead-dark'>
                                        <tr>
                                            <th scope='col'>#</th>
                                            <th scope='col'>Nombre</th>
                                            <th scope='col'>Apellido</th>
                                            <th scope='col'>Username</th>
                                            <th scope='col'>Email</th>
                                            <th scope='col'>Teléfono</th>
                                            <th scope='col'>Rol</th>
                                            <th scope='col'>Estado</th> 
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead >
                                    <tbody className=''>
                                        {
                                            user.map((index) => (
                                                <tr key={index.codeUser}>
                                                    <th>{index.codeUser}</th>
                                                    <td>{index.nameUser}</td>
                                                    <td>{index.lastname}</td>
                                                    <td>{index.username}</td>
                                                    <td>{index.email}</td>
                                                    <td>{index.phone}</td>
                                                    <td>{index.role}</td>
                                                    <td>{index.state}</td>
                                                    <td><EditIcon onClick={() => handleOnClick(index)}/></td>
                                                    <td><DeleteIcon onClick={() => deletedUser(index.codeUser)}/></td>
                                                </tr>  
                                            ))
                                        }
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                    {showWarning && <WarningCard onAcepted={() => handleOnAcepted(form.codeUser)} onCanceled={handleOnCanceled} onClosed={handleOnClosed} />}
                </div>
            </div>
        </div>
    )
}
