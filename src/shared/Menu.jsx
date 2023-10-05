import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../modules/auth/context/auth';
import menu from '@/assets/css/menu.module.css'
import CampusLogo from '@/assets/img/logoCampus.png'
import BurguerButton from './BurguerButton';
import styled from 'styled-components'

function Menu() {
    const auth = useAuth();
    const routes = [];
    const [clicked, setClicked] = useState(false)
    const handleClick = () => {
        setClicked(!clicked)
    }


    if (auth.user) {
        routes.push({
            to: '/',
            text: 'Inicio',
            private: false
        });

        if (auth.user.rol === 3) {
            routes.push({
                to: '/SuperAdmin',
                text: 'Administracion',
                private: true,
            });
        } else if (auth.user.rol === 2) {
            routes.push({
                to: '/Client',
                text: 'Usuario',
                private: true,
            });
        }
        routes.push({
            to: '/logout',
            text: 'Salir',
            private: true,
        });
    } else {
        routes.push({
            to: '/',
            text: 'Inicio',
            private: false
        });
        routes.push({
            to: '/Registrarse',
            text: 'Registrarse',
            private: true
        });
        routes.push({
            to: '/Login',
            text: 'Entrar',
            private: false,
            publicOnly: true,
        });
    }

    return (
        <>
        <nav className={`container-fluid ${menu.container} nav`}>
            <div className="row">
                <div className={`col-3 ${menu.logo}`}>
                    <a href="" target="_blank" style={{display : "flex", alignItems : "center"}}>
                        <img src={CampusLogo}  alt="campus logo" style={{ width: 100}}/>
                    </a>
                </div>
                <div className="col-9">
                <ul>
                    {routes.map(route => {
                    if (route.publicOnly && auth.user) return null;
                    if (route.private && !auth.user) return null;
                    
                    return (
                        <li className={menu.respo} key={route.to}>
                        <NavLink
                            style={({ isActive }) => ({
                            color: isActive ? '#B1D0E0' : '#2C74B3',
                            textDecoration: isActive ? 'none' : 'none',
                            })}
                            to={route.to}
                        >
                            {route.text}
                        </NavLink>
                        </li>
                    );
                    })}
                <div className={menu.respoBurguer}>
                <BurguerButton clicked={clicked} handleClick={handleClick}/>
                </div>
                </ul>
                </div>
            </div>
        </nav>
        
        <NavContainer>
            <div className={`links ${clicked ? 'active' : ''}`}>
            <div>
                    {routes.map(route => {
                    if (route.publicOnly && auth.user) return ndivl;
                    if (route.private && !auth.user) return null;
                    
                    return (
                        <p  key={route.to}>
                        <NavLink
                            style={({ isActive }) => ({
                            color: isActive ? '#B1D0E0' : '#2C74B3',
                            textDecoration: isActive ? 'none' : 'none',
                            })}
                            to={route.to}
                        >
                            {route.text}
                        </NavLink>
                        </p>
                    );
                    })}
                </div>
            </div>
            <BgDiv className={`initial ${clicked ? ' active' : ''}`}></BgDiv>
        </NavContainer>
        </>
        
    );
}

export { Menu };


const NavContainer = styled.nav`

p{
    color: white;
    text-decoration: none;
    margin-right: 1rem;
}
.links{
    position: absolute;
    top: -700px;
    left: -2000px;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    transition: all .5s ease;
    p{
    color: white;
    font-size: 2rem;
    display: grid;
    }
    @media(min-width: 768px){
    position: initial;
    margin: 0;
    p{
        font-size: 1rem;
        color: white;
        display: inline;
    }
    display: block;
    }
}
.links.active{
    width: 100%;
    display: block;
    position: fixed;
    margin-left: auto;
    margin-right: auto;
    top: 30%;
    left: 0;
    right: 0;
    z-index: 999;
    text-align: center;
    a{
    font-size: 2rem;
    margin-top: 1rem;
    color: white;
    }
}

`

const BgDiv = styled.div`
background-color: #144272;
position: absolute;
top: -1000px;
left: -1000px;
width: 100%;
height: 100%;
z-index: 2;
transition: all .6s ease ;

&.active{
    border-radius: 0 0 80% 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: fixed;
}
`

