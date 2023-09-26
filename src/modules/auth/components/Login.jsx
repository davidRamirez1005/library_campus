import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import Loading from '@/shared/Loading';
import { useAuth } from '../context/auth';
import style from '../assets/css/login.module.css'
import spinner from '../../../assets/css/loading.module.css'



let backendUrl = `${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}`;

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
        /**
         * ? usando fetch
         */
        // let header = new Headers();
        // header.set('Content-Type', 'application/json');
        // header.set('Authorization', `Bearer ${token}` );

        // const response = await fetch('http://192.168.1.25:5051/login', {
        // method: 'POST',
        // headers: header,
        // body: JSON.stringify({ ROL_EMAIL, ROL_PASSWORD }),
        // });

        // if (!response.ok) {
        // throw new Error('Error en la solicitud');
        // }
        //const data = await response.json();
        /**
         * ? usando axios
         */
        const response = await axios.post(`http://${backendUrl}/login`, {
        ROL_EMAIL,
        ROL_PASSWORD,
        }, 
        {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        });
        if (response.status != 200) {
            throw new Error('Error en la solicitud');
        }
        const data = response.data;
        setToken(data.Token);
        console.log(data.Token)
        const TOKEN = data.Token
        const NAME = data.result.full_name
        const USERNAME = data.result.username
        const ROL = data.result.rol

        if (!data.Token) {
            console.log('Verifica los datos ingresados');
        } else {
            auth.logins({ email: ROL_EMAIL, name : NAME , rol : ROL, username : USERNAME, bearer : TOKEN});
            switch (data.result.rol) {
                case 1:
                    navigate('/Admin');
                    break;
                case 2:
                    navigate('/Client');
                    break;
                case 3:
                    navigate('/SuperAdmin');
                    break;
                default:
                    break;
            }
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
    const handleRegisterClick = () => {
        navigate('/Registrer');
    };
return (
<div>
    <br />
    
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
        <button className={style.btn2} value="registrer" onClick={handleRegisterClick}>
            Registrarse!
        </button>
    </p>
</div>
<div className={spinner.spinnerLoader}>
{isLoading && <Loading />}
</div>


</div>
);
}