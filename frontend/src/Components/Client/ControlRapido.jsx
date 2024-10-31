import { Input } from '../UI/Input'
import { useControl } from '../../shared/Control/useControl'
import { useState } from 'react'
import BtnAdd from '../UI/BtnAdd'
import CardResult from '../UI/CardResult'

export const ControlRapido = () => {

    const { calcularControl, control, isResult } = useControl()

    const [form, setForm] = useState({
        hrs_entry: '',
    })

    const handleOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const cleanInput = () => {
        setForm({
            hrs_entry: '',
        })
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        calcularControl(form)
    }

    return (
        <div>
            <div className="m-2">
                <div className="form-control m-2 p-4">
                    <h4>Control Rápido</h4>
                    <form action="" onSubmit={handleOnSubmit}>
                        <div>
                            <label htmlFor="">Ingresa la hora de entrada</label>
                            <Input type={"text"} placeholder={'00:00:00'} name={'hrs_entry'} value={form.hrs_entry} onChange={handleOnChange} />
                        </div>
                        <BtnAdd name={'Calcular'} />

                        <div className='m-4'>
                            <div>
                                <table className='table table-hover border shadow-sm p-3 mb-5 bg-body rounded'>
                                    <thead className='table'>
                                        <tr>
                                            <th scope='col'>Boletos disponibles</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            control.map((index) => (
                                                <tr key={index}>
                                                    <td>{index}</td>
                                                </tr>
                                            ))
                                        }

                                    </tbody>
                                </table>
                                {/* <div>
                                    <div className="row">
                                        <div className="col">
                                            Debes dar: <strong>{isResult[0] === undefined ? 'Selecciona un horario' : isResult[0]}</strong>
                                        </div>
                                        <div className="col">
                                            Debes dar: <strong>{isResult[1] === undefined ? 'Selecciona un horario' : isResult[1]}</strong>
                                        </div>
                                        <div className="col">
                                            Debes dar: <strong>{isResult[2] === undefined ? 'Selecciona un horario' : isResult[2]}</strong>
                                        </div>
                                        <div className="col">
                                            Debes dar: <strong>{isResult[3] === undefined ? 'Selecciona un horario' : isResult[3]}</strong>
                                        </div>
                                    </div>
                                </div>*/}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
