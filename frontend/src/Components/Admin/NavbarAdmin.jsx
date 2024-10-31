import React from 'react'
import styled from 'styled-components'
import { Container, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap'
import BtnLogout from '../UI/BtnLogout'; 
import Search from '../UI/Search'

import img2 from '../../assets/logoMacro.png'
import { useLogin } from '../../shared/Login-Register/useLogin';


const StyledImg = styled.img`
  width: 5rem; 
`;

const CenteredSearch = styled.div`
  flex-grow: 1;  
  display: flex;
  justify-content: center;
`;

export const NavbarAdmin = () => {


  const {logout} = useLogin()

  const user = localStorage.getItem('user')
  //console.log(user);
  let data = JSON.parse(user)

  return (
    <Navbar collapseOnSelect expand="lg" className=" p-2" style={{ background: '#2f518d', color: '#fff' }}>
  
        <StyledImg src={img2} alt="" />
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Navbar.Brand href="/home/macro/admin" style={{ color: '#fff', fontSize: '' }}> Usuarios</Navbar.Brand>
        <Navbar.Brand href="/home/macro/admin/gerencias" style={{ color: '#fff', fontSize: '' }}> Gerencias</Navbar.Brand>
          <Nav className="me-auto"> 
          </Nav> 
          <CenteredSearch>
          <Search />
        </CenteredSearch>
          <Nav>
              <Navbar.Brand style={{ color: '#fff' }}>Bienvenido {data.nameUser} </Navbar.Brand>
              <BtnLogout onClick={logout}/>
          </Nav>
        </Navbar.Collapse>
       
      
    </Navbar>

  )
}
