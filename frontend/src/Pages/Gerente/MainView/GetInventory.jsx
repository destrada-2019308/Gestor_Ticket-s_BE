import { useInventary } from '../../../shared/Inventary/useInventary'
import { useEffect } from 'react'
import { Table } from 'react-bootstrap'

export const GetInventory = () => {

    const { inventary, getInventoy } = useInventary()

    useEffect(() => {
        getInventoy()
    }, [])
    console.log(inventary)

    return (
        <>
            <div>
                <div className="form-control">
                    <div className="m-4">
                        <Table striped bordered hover responsive>
                            <thead className='thead-dark'>
                                <tr>
                                    <th scope='col'>#</th>
                                    <th scope='col' className='text-center'>Dia</th>
                                    <th scope='col' className='text-center'>Cantidad (4hrs) y Precio</th>
                                    <th scope='col' className='text-center'>Cantidad (2hrs) y Precio</th>
                                    <th scope='col' className='text-center'>Cantidad (1hrs) y Precio</th>
                                    <th scope='col' className='text-center'>Cantidad (30min) y Precio</th>
                                </tr>
                            </thead >
                            <tbody className=''>
                                {
                                    inventary.map((index) => (
                                        <tr key={index.codeInventario}>
                                            <th>{index.codeInventario}</th>
                                            <td className='text-center'>{index.date.split('T')[0]}</td>
                                            <td className='text-center'>{index.stock_boleta4h + ' ------------- ' + "Q." + index.precio_boleta4h}</td>
                                            <td className='text-center'>{index.stock_boleta2h + ' ------------- ' + "Q." + index.precio_boleta2h}</td>
                                            <td className='text-center'>{index.stock_boleta1h + ' ------------- ' + "Q." + index.precio_boleta1h}</td>
                                            <td className='text-center'>{index.stock_boleta30min + ' ------------- ' + "Q." + index.precio_boleta30min}</td>

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
