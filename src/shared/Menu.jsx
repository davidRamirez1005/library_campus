import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../modules/auth/context/auth';
import menu from '@/assets/css/menu.module.css'
import CampusLogo from '@/assets/img/logoCampus.png'

function Menu() {
    const auth = useAuth();
    const routes = [];


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
        } else if (auth.user.rol === 1) {
            routes.push({
                to: '/Admin',
                text: 'Empleado',
                private: true,
            });
        } else if (auth.user.rol === 2) {
            routes.push({
                to: '/Client',
                text: 'cliente',
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
                        <li key={route.to}>
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
                </ul>
                </div>
            </div>
        </nav>
    );
}

export { Menu };
