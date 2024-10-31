import { useControl } from '../../../shared/Control/useControl'
import { useEffect } from 'react'
import { useManagements } from '../../../shared/Managements/useManagements'
import { Table } from 'react-bootstrap'

export const GetControl = () => {

    const { isControl, getControl, allControl, getAllControl } = useControl()
    const { getManagements, managements } = useManagements()

    useEffect(() => {
        getAllControl()
        getManagements()
    }, [])

    return (
        <>
        <div className=" ">
        <div className="form-control ">
        <div className="m-4 p-4">
        <h2>Control de boletas</h2>
        <hr />
        <br />
            <Table striped bordered hover responsive>
                <thead className='thead-dark  '>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Hora de entrada</th>
                        <th scope='col'>Hora de salida</th>
                        <th scope='col'>Descripción</th>
                        <th scope='col'>Cliente</th>
                        <th scope='col'>Rol</th>
                        <th scope='col'>Código de gerencia</th>
                        <th scope='col'>Código de Usuario</th>
                        <th scope='col'>Fecha</th>
                        <th scope='col'>Boletos usados 4hrs</th>
                        <th scope='col'>Boletos usados 2hrs</th>
                        <th scope='col'>Boletos usados 1hrs</th>
                        <th scope='col'>Boletos usados 30min</th>
                    </tr>
                </thead >
                <tbody className='m-4 p-4'>
                    {
                        allControl.map((index) => (
                            <tr key={index.codeBoleta}>
                                <th>{index.codeBoleta}</th>
                                <td>{index.hrs_init}</td>
                                <td>{index.hrs_end}</td>
                                <td>{index.description}</td>
                                <td>{index.nameClient}</td>
                                <td>{index.role}</td> 
                                <td>{index.codeGerencia}</td>
                                <td>{index.codeUser}</td>
                                <td>{index.date.split('T')[0]}</td>
                                <td>{index.boletosUsados4h}</td>
                                <td>{index.boletosUsados2h}</td>
                                <td>{index.boletosUsados1h}</td>
                                <td>{index.boletosUsados30min}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
        </div>
        </div>
        </>
    )
}
