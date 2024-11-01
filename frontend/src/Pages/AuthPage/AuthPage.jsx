import {useEffect, useState} from 'react'
import { useLogin } from '../../shared/Login-Register/useLogin'

import './style.css'
import { Input } from '../../Components/UI/Input'

export const AuthPage = () => {

    const { login, isLoading } = useLogin()

    const [form, setForm] = useState({
        username: '',
        password: ''
    })

    /* Funcionalidad para hacer textos de bienvenida aleatorios */ 
    let array  = ['Inicia sesión para acceder a las funcionalidades del proyecto ','Proyecto sobre la gestion de ticket de parqueo de Grupo Macro']
 

    const randomText = () => {
        let random = Math.floor(Math.random() * array.length)
        return array[random]
    }

    const [mensaje, setMensaje] = useState(randomText);

    // Actualiza el mensaje cuando el componente se monta
    useEffect(() => {
      setMensaje(randomText());
    }, []);
  
 
    const handleOnSubmit = (e) => {
        e.preventDefault()
        login(form)
    } 

    const handleOnChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value
        })
      }

    return (
        <div className='div-auth'>
            <div className='div-h2'> 
                <br />
                <div className='cont' id='container'>
                    <div>
                        <div className="form-container sign-in-container">
                            <form onSubmit={handleOnSubmit} >
                                <h1>Inicia sesión</h1>

                                <div className='img'>

                                </div> 
                                <span>usa tu cuenta personal</span>
                                
                                {/* <a href="#" className='div-a'>Forgot your password?</a> */}
                                <Input type='text' className={'form-input'} placeholder='Username' name='username' required value={form.username} onChange={handleOnChange}/>
                                <Input type='password' className={'form-input'} placeholder='Password' name='password' required value={form.password} onChange={handleOnChange}/>
                                
                                <button className='mt-2 boton' >Iniciar sesión</button>
                            </form>
                        </div>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-right">
                                <h1>Hola de nuevo </h1>
                                <p>{mensaje} </p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
