import React from 'react'
import { AuthPage } from './Pages/AuthPage/AuthPage.jsx'
import { NotFound } from './Pages/NotFound.jsx'
import { HomePageAdmin } from './Pages/Admin/HomePageAdmin.jsx'
import { HomePageClient } from './Pages/Client/HomePageClient.jsx'
import { HomePageGerente } from './Pages/Gerente/HomePageGerente.jsx'
import { ContentRole } from './Pages/AuthPage/ContentRole.jsx'
import { Gerencias } from './Pages/Admin/CRUD\'s/Gerencias.jsx'
import { Control } from './Components/Client/Control.jsx'
import { Inventary } from './Pages/Client/Inventray/Inventary.jsx'
import { ControlPage } from './Pages/Gerente/ControlPage.jsx'
import { Report } from './Pages/Gerente/MainView/Report.jsx' 
import { GerenciasGerente } from './Pages/Gerente/MainView/GerenciasGerente.jsx'

export const routes = [
    //Paginas principales
    {path: '/', element: <AuthPage/>},
    {path: '/home/*', element: <ContentRole/>},
    {path: '*', element: <NotFound/>},

    {path: '/home/macro/admin', element: <HomePageAdmin/>},
    {path: '/home/macro/admin/gerencias', element: <Gerencias/>},
    {path: '/home/macro/client', element: <HomePageClient/>},
    {path: '/home/macro/gerente', element: <HomePageGerente/>},
    {path: '/home/macro/client/control', element: <Control/>},
    {path: '/home/macro/cliente/inventary', element: <Inventary/>},
    {path: '/home/macro/gerente/control', element: <ControlPage/>},
    {path: '/home/macro/gerente/report', element: <Report/>},
    {path: '/home/macro/gerente/gerencias', element: <GerenciasGerente/>},
    
]