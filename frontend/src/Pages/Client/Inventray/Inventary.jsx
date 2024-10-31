import { NavbarClient } from '../../../Components/Client/NavbarClient'
import { Input } from '../../../Components/UI/Input'
import { useState, useEffect } from 'react'
import { useInventary } from '../../../shared/Inventary/useInventary'
import BtnAdd from '../../../Components/UI/BtnAdd'
import InputDatePicker from '../../../Components/UI/InputDatePicker'

export const Inventary = () => {

    const { addInventry, getInventoy, inventary } = useInventary()

    const [ form, setForm ] = useState({
        stock_boleta4h: '',
        stock_boleta2h: '',
        stock_boleta1h: '',
        stock_boleta30min: ''
    }) 

    const handleOnChange = (e) => {
        setForm({
            ...form, 
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        getInventoy()
    }, [])

    const handleOnSubmit = (e) => {
        e.preventDefault()
        addInventry(form)
    }

  return (
    <>
        <NavbarClient/>   
        <div className="m-4">
            <div className="form-control m-2 p-4">
                <h4>Agreagar Inventario</h4>
                <form action="" onSubmit={handleOnSubmit}>
                    <div className="row">
                        {/*<div className="col">
                        <label htmlFor="">Dia de ingreso para inventario</label>
                        <InputDatePicker/>
                        </div> */}
                        <div className="col">
                            <label htmlFor="" className="form-label">Cantidad de boletos (4 horas)</label>
                            <Input
                                type={"number"}
                                placeholder={'Boletos de 4 horas'}
                                name={'stock_boleta4h'}
                                required={true}
                                value={form.stock_boleta4h}
                                onChange={handleOnChange}/>
                        </div>
                        <div className="col">
                            <label htmlFor="" className="form-label">Cantidad de boletos (2 horas)</label>
                            <Input
                                type={"number"}
                                placeholder={'Boletos de 2 horas'}
                                name={'stock_boleta2h'}
                                required={true}
                                value={form.stock_boleta2h}
                                onChange={handleOnChange}/>
                        </div>
                        <div></div>
                        <div className="col">
                            <label htmlFor="" className="form-label">Cantidad de boletos (1 horas)</label>
                            <Input
                                type={"number"}
                                placeholder={'Boletos de 1 horas'}
                                name={'stock_boleta1h'}
                                required={true}
                                value={form.stock_boleta1h}
                                onChange={handleOnChange}/>
                        </div>
                        <div className="col">
                            <label htmlFor="" className="form-label">Cantidad de boletos (30 minutos)</label>
                            <Input
                                type={"number"}
                                placeholder={'Boletos de 30 minutos'}
                                name={'stock_boleta30min'}
                                required={true}
                                value={form.stock_boleta30min}
                                onChange={handleOnChange}/>
                        </div>
                    </div> 
                    <br />
                    <BtnAdd name={'Guardar'}/>
                </form>
                <div className="m-4">
                    <div>
                        <h4>Lista de Inventarios</h4>
                        <table className="table table-hover  border shadow-sm p-4 mb-5 bg-body rounded ">
                                    <thead className='thead-dark'>
                                        <tr>
                                            <th scope='col'>#</th>
                                            <th scope='col'>Dia</th>
                                            <th scope='col'>Boleta 4h</th>
                                            <th scope='col'>Boleta 2h</th>
                                            <th scope='col'>Boleta 1h</th>
                                            <th scope='col'>Boleta 30min</th> 
                                            <th scope='col'>Cantidad (4 horas)</th>
                                            <th scope='col'>Cantidad (2 horas)</th>
                                            <th scope='col'>Cantidad (1 horas)</th>
                                            <th scope='col'>Cantidad (30 minutos)</th> 
                                        </tr>
                                    </thead >
                                    <tbody className=''>
                                        {
                                            inventary.map((index) => (
                                                <tr key={index.codeInventario }>
                                                    <th>{index.codeInventario }</th>
                                                    <td>{index.date.split('T')[0]}</td>
                                                    <td>{index.boleta4h }</td>
                                                    <td>{index.boleta2h }</td>
                                                    <td>{index.boleta1h }</td>
                                                    <td>{index.boleta30min }</td>
                                                    <td>{index.stock_boleta4h }</td>
                                                    <td>{index.stock_boleta2h }</td> 
                                                    <td>{index.stock_boleta1h  }</td> 
                                                    <td>{index.stock_boleta30min  }</td>  
                                                </tr>  
                                            ))
                                        }
                                    </tbody>
                                </table>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
