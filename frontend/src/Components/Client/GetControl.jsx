import { useEffect } from 'react'
import { useControl } from '../../shared/Control/useControl'
import { Table } from 'react-bootstrap'

export const GetControl = () => {

    const { isControl, getControl } = useControl()

    let user = localStorage.getItem('user')
    let userId = JSON.parse(user).codeUser

    useEffect(() => {
        getControl(userId)
    }, []) 
    return (
        <>
            <div>
                <div className='m-4'>
                    <div className="form-control p-4">
                        <div className="m-4">
                        <Table striped bordered hover responsive >
                            <thead className='thead-dark'>
                                <tr>
                                    <th scope='col'>#</th>
                                    <th scope='col'>Hora de entrada</th>
                                    <th scope='col'>Hora de salida</th>
                                    <th scope='col'>Descripción</th>
                                    <th scope='col'>Cliente</th>
                                    <th scope='col'>Rol</th>
                                    <th scope='col'>Código de gerencia</th>
                                    <th scope='col'>Fecha</th>
                                </tr>
                            </thead >
                            <tbody className=''>
                                {
                                    isControl.map((index) => (
                                        <tr key={index.codeBoleta}>
                                            <th>{index.codeBoleta}</th>
                                            <td>{index.hrs_init}</td>
                                            <td>{index.hrs_end}</td>
                                            <td>{index.description}</td>
                                            <td>{index.nameClient}</td>
                                            <td>{index.role}</td>
                                            <td>{index.codeGerencia}</td>
                                            <td>{index.date.split('T')[0]}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
