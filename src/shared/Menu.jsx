import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../modules/auth/context/auth';
import menu from '@/assets/css/menu.module.css'
import CampusLogo from '@/assets/img/logoCampus.png'

function Menu() {
    const auth = useAuth();
    
    return (
        <nav className={`container-fluid ${menu.container} nav`}>
            <div className="row">
                <div className={`col-3 ${menu.logo}`}>
                    <a href="https://vitejs.dev" target="_blank" style={{display : "flex", alignItems : "center"}}>
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

const routes = [];
routes.push({
    to: '/',
    text: 'Home',
    private: false
});
routes.push({
    to: '/SuperAdmin',
    text: 'Administracion',
    private: true,
});
routes.push({
    to: '/Login',
    text: 'Login',
    private: false,
    publicOnly: true,
});
routes.push({
    to: '/logout',
    text: 'Logout',
    private: true,
});

export { Menu };
