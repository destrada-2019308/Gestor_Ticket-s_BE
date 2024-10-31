import { NavbarGerente } from "../../Components/Gerente/NavbarGerente"
import { GetInventory } from "../../Pages/Gerente/MainView/GetInventory"
import { useInventary } from "../../shared/Inventary/useInventary"
import { useState } from "react"
import { Input } from "../../Components/UI/Input"
import BtnAdd from "../../Components/UI/BtnAdd"

export const HomePageGerente = () => {


  const { addInventry } = useInventary()

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

  const handleOnSubmit = (e) => {
      e.preventDefault()
      addInventry(form)
  }

  return (
    <>
      <NavbarGerente />
      <div className="m-4">
        <div className="form-control m-2 p-4">
          <h4>Gestion de inventario</h4>
            <form action="" onSubmit={handleOnSubmit}>
                      <div className="row">
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
                  
        </div>
        
      </div>
      <div className="m-2">
        <div className="m-4">
          <GetInventory/>
        </div>
      </div>
    </>
  )
}
