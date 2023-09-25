import React from 'react';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import style from '../../pages/superAdmin/assets/css/inicio.module.css'

function Logout() {
    const navigate = useNavigate();
    const auth = useAuth();

    const logout = (e) => {
        e.preventDefault();
        auth.logout();
    };

    return (
        <>
        <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        }}>
            <h1>Cerrar cesión</h1>

            <form onSubmit={logout}>
                <label>¿Segur@ de que quieras salir?</label>

                <div style={{
                display : 'flex',
                columnGap: '1rem',
                marginTop: '1rem',
                }}>
                    <button className={style.btnstyle} style={{backgroundColor :"#2a5e83"}} type="submit">Salir</button>
                    <button className={style.btnstyle} value="volver" onClick={() => {
                        navigate('/')
                        }}>
                        Volver
                    </button>
                </div>
            </form>
        </div>
        
        </>
    );
}

export { Logout };