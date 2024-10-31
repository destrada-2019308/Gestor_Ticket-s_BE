import { Route, Routes } from "react-router-dom"
import { HomePageAdmin } from "../Admin/HomePageAdmin"
import { HomePageGerente } from "../Gerente/HomePageGerente"
import { NotFound } from "../NotFound"
import { HomePageClient } from "../Client/HomePageClient"

export const ContentRole = () => {

    let user = localStorage.getItem('user')
    let role = JSON.parse(user).role

  return (
    <Routes>
        {
            role === 'ADMIN' ? (
                <Route path="macro" element={<HomePageAdmin/>}/>
            ) : role === 'CLIENTE' ? (
                <Route path="macro" element={<HomePageClient/>}/>
            ) : role === 'GERENTE' ? (
                <Route path="macro" element={<HomePageGerente/>}/>
            ) : (
                <Route path="*" element={<NotFound/>}/>
            )
        }
    </Routes>
    )
}
