import React from 'react'
import { useControl } from '../../../shared/Control/useControl'
import { NavbarGerente } from '../../../Components/Gerente/NavbarGerente'
import { Input } from '../../../Components/UI/Input'
import { useState, useEffect } from 'react'
import BtnAdd from '../../../Components/UI/BtnAdd'

export const Report = () => {

    const { findByRole, result, data } = useControl()

    const [form, setForm] = useState({
        role: ''
    })


    const handleOnChange = (e) => {
        const selectedRole = e.target.value
        setForm({
            ...form,
            role: e.target.value
        })
        if (selectedRole) {
            findByRole({ role: selectedRole })
        }
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        findByRole(form)
    }

    console.log(form)
    console.log(result)
    console.log(data)
    return (
        <>
            <NavbarGerente />
            <div className="m-4" >
                <form className="form-control m-2 p-4">
                    
                    <h4>Reporte de control por Rol</h4>
                    <div className="row">
                        <div className="col mb-3">
                            <select name="role" id=""
                                className='form-select'
                                key={form.role}
                                value={form.role}
                                onChange={handleOnChange}>
                                <option value="">Selecciona un ROLE</option>
                                <option value="TRABAJADOR">TRABAJADOR</option>
                                <option value="VISITA">VISITA</option>
                            </select>
                        </div> 

                    </div>
                    
 
                    <table className="table table-hover border shadow-sm p-3 mb-5 bg-body rounded">
                        <thead className='thead-dark'>
                            <tr>
                                <th scope='col'>#</th>
                                <th>Hora de entrada</th>
                                <th>Hora de salida</th>
                                <th>Rol</th>
                                <th>Nombre del cliente </th>
                                <th>Boletos 4 horas</th>
                                <th>Boletos 2 horas</th>
                                <th>Boletos 1 horas</th>
                                <th>Boletos 30 minutos</th>
                                
                            </tr>
                        </thead >
                        <tbody className=''>
                            {
                                data.map(index1 => (
                                    <tr key={index1.codeBoleta}>
                                        <td>{index1.codeBoleta}</td>
                                        <td>{index1.hrs_init}</td>
                                        <td>{index1.hrs_end}</td>
                                        <td>{index1.role}</td>
                                        <td>{index1.nameClient}</td>
                                        <td>{index1.boletosUsados4h}</td>
                                        <td>{index1.boletosUsados2h}</td>
                                        <td>{index1.boletosUsados1h}</td>
                                        <td>{index1.boletosUsados30min}</td> 
                                    </tr>
                                ))
                            } 
                            
                        </tbody>     

                    </table>
                    <h4>Total de boletos gastados por los trabajadores</h4>
                    <br />
                    <div className="row">
                        <div className="col"><strong>Boletos 4 horas : {result[0] === undefined ?  0 : result[0]}</strong></div>
                        <div className="col"><strong>Boletos 2 horas : {result[1] === undefined ?  0 : result[1]}</strong></div>
                        <div className="col"><strong>Boletos 1 horas : {result[2] === undefined ?  0 : result[2]}</strong></div>
                        <div className="col"><strong>Boletos 30 minutos : {result[3] === undefined ?  0 : result[3]}</strong></div>
                    </div>
                </form>

            </div>


        </>
    )
}
