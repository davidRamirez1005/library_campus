import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import Loading from '@/shared/Loading';
import { useAuth } from '../context/auth';
import style from '../assets/css/login.module.css'


export default function Login() {
    const navigate = useNavigate();
    const auth = useAuth();

    let [ROL_EMAIL, getMail] = useState('JDavidRamirez@gmail.com');
    let [ROL_PASSWORD, getCon] = useState('jose@1005');
    let [token, setToken] = useState('');
    let [isLoading, setIsLoading] = useState(false);

const login = async () => {
    setIsLoading(true);
    try {
        let header = new Headers();
        header.set('Content-Type', 'application/json');
        header.set('Authorization', `Bearer ${token}` );

        const response = await fetch('http://127.10.10.10:5050/login', {
        method: 'POST',
        headers: header,
        body: JSON.stringify({ ROL_EMAIL, ROL_PASSWORD }),
        });

        if (!response.ok) {
        throw new Error('Error en la solicitud');
        }
        
        const data = await response.json();
        setToken(data.Token);
        console.log(data);
        const NAME = data.result.full_name

        if (!data.Token) {
            alert('Verifica los datos ingresados');
        } else {
            auth.logins({ username: ROL_EMAIL, name : NAME });
            navigate('/SuperAdmin');
        }
        } catch (error) {
            alert('Verifica los datos ingresados');
            error
        } finally {
            setIsLoading(false);
        }
    };
    // if (!auth.user) {
    //     return <Navigate to='/Login' />
    // }
return (
<div>
    <br /><br />
    
<div className={style.form}>
    <div className={style.form_title}><span>Inicia sesión</span></div>
    <div className={style.title_2}><span>CAMPUS</span></div>
    <div className={style.input_container}>
        <input className={style.input_email} type="email" value={ROL_EMAIL}
        onChange={(e) => getMail(e.target.value)} placeholder="Email" />
        <span> </span>
    </div>

    <section className={style.bg_stars}>
        <span className={style.star}></span>
        <span className={style.star}></span>
        <span className={style.star}></span>
        <span className={style.star}></span>
    </section>

    <div className={style.input_container}>
        <input className={style.input_pwd} type="password" value={ROL_PASSWORD}
        onChange={(e) => getCon(e.target.value)} placeholder="contraseña" />
    </div>
    <button  className={style.submit} value="login" onClick={login}>
        <span className={style.sign_text}>ENVIAR</span>
    </button>
    <p className={style.signup_link}>
        No registrado?
        <a href="" className={style.up}> Registrarse!</a>
    </p>
</div>
{isLoading && <Loading />}


</div>
);
}