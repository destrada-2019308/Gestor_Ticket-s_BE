import BtnAdd from '../UI/BtnAdd'
import { Input } from '../UI/Input'
import { useState, useEffect } from 'react'
import { useManagements } from '../../shared/Managements/useManagements'
import { useControl } from '../../shared/Control/useControl'

export const Control = () => {

    const { getManagements, managements } = useManagements()
    const { addControl } = useControl()

    const [ form, setFrom ] = useState({
        hrs_init: '',
        role: '',
        description: '',
        nameClient: '',
        codeGerencia: '',
        codeUser: '',
        boletosUsados4h: '',
        boletosUsados2h: '',
        boletosUsados1h: '',
        boletosUsados30min: ''
    })

    let user = localStorage.getItem('user')
    let userId = JSON.parse(user).codeUser

    useEffect(() => {
        getManagements()
    }, [])

    const cleanInputs = () => {
        setFrom({
            hrs_init: '',
            role: '',
            description: '',
            nameClient: '',
            codeGerencia: '',
            codeUser: '',
            boletosUsados4h: '',
            boletosUsados2h: '',
            boletosUsados1h: '',
            boletosUsados30m: ''
        })
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        form.codeUser = userId
        addControl(form)
        cleanInputs()
    }

    const handleOnChange = (e) => {
        setFrom({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    console.log(form)

  return (
    <div>
        <div className="m-4">
            <div className="form-control m-2 p-4">
                <h4>Control de tickets</h4>
                <form action="#" onSubmit={handleOnSubmit}>
                    <div className="row">
                        <div className="col">
                            <label htmlFor="">Hora de entrada</label>
                            <Input 
                                type={"text"} 
                                value={form.hrs_init}
                                name="hrs_init" 
                                onChange={handleOnChange} 
                                placeholder={'00:00:00'} 
                                required={true}/>
                        </div>
                        <div className='col'>
                            <label htmlFor="">Role</label>
                            <select name="role" id="" className='form-select my-3' key={form.role} value={form.role} onChange={handleOnChange}>
                                <option value="">Selecciona un role</option>
                                <option value="TRABAJADOR">TRABAJADOR</option>
                                <option value="VISITA">VISITA</option>
                            </select>
                        </div>
                        <div></div>
                        <div className="col">
                            <label htmlFor="">Descripción</label>
                            <Input 
                                type={'text'}
                                name="description" 
                                onChange={handleOnChange}
                                placeholder={'Descripción'}
                                value={form.description}
                                required={true}/>
                        </div>
                        <div></div>
                        <div className="col">
                            <label htmlFor="">Nombre Cliente</label>
                            <Input
                                type={'text'}
                                name="nameClient" 
                                onChange={handleOnChange}
                                placeholder={'Nombre del cliente'}
                                value={form.nameClient}
                                required={true}/>
                        </div> 
                        <div className="col">
                            <label htmlFor="">Gerencia a la que viene</label>
                            <select name="codeGerencia" id=""className='form-select my-3' value={form.codeGerencia} onChange={handleOnChange}>
                            <option value="">Selecciona una gerencia</option>
                             {
                                managements.map(management => (
                                <option key={management.codeGerencia} value={management.codeGerencia}>
                                    {management.nameGerencia}
                                </option>))
                             }
                            </select>
                        </div>
                        <div></div>
                        <div className="col">
                            <label htmlFor="">Boletos Usados de 4 horas</label>
                            <Input
                                type={'number'}
                                name="boletosUsados4h" 
                                onChange={handleOnChange}
                                placeholder={'Boletos de 4h'}
                                value={form.boletosUsados4h}
                                required={true}/>
                        </div> 
                        <div className="col">
                            <label htmlFor="">Boletos Usados de 2 horas</label>
                            <Input
                                type={'number'}
                                name="boletosUsados2h" 
                                onChange={handleOnChange}
                                placeholder={'Boletos de 2h'}
                                value={form.boletosUsados2h}
                                required={true}/>
                        </div>
                        <div></div>
                        <div className="col">
                            <label htmlFor="">Boletos Usados de 1 hora</label>
                            <Input
                                type={'number'}
                                name="boletosUsados1h" 
                                onChange={handleOnChange}
                                placeholder={'Boletos de 1h'}
                                value={form.boletosUsados1h}
                                required={true}/>
                        </div> 
                        <div className="col">
                            <label htmlFor="">Boletos usados de 30 minutos</label>
                            <Input
                                type={'number'}
                                name="boletosUsados30min" 
                                onChange={handleOnChange}
                                placeholder={'Boletos de 30min'}
                                value={form.boletosUsados30min}
                                required={true}/>
                        </div>
                    </div>
                    <br />
                    <BtnAdd name={'Agregar'} />
                    
                </form>
            </div>
        </div>
    </div>
  )
}
