import React from 'react'
import { NavbarGerente } from '../../Components/Gerente/NavbarGerente'
import { GetControl } from '../../Pages/Gerente/MainView/GetControl'

export const ControlPage = () => {
  return (
    <>
        <NavbarGerente/>
        <div className="m-5">
            <GetControl/>
        </div>
    </>
  )
}
