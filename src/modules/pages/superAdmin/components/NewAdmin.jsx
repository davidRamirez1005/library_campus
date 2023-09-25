import React, { useState } from 'react';
import axios from 'axios';
import Loading from '@/shared/Loading';
import { Menu } from '@/shared/Menu';
import { useAuth } from '../../../auth/context/auth';
import style from '../../../auth/assets/css/registrer.module.css'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

let backendUrl = `${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}`;

export default function NewAdmin() {
    const auth = useAuth();

    let [full_name, setFullName] = useState('nuevo admin')
    let [identification, setIdentification] = useState('123654788')
    let [email, setEmail] = useState('nuevo@example.com')
    let [password, setPassword] = useState('secreto')
    let [rol, setRol] = useState(1)
    let [isLoading, setIsLoading] = useState(false);
    let [isError, setIsError] = useState(false);
    let [isTrue, setIsTrue] = useState(false);

    const sesionAdmin = async () => {
        setIsLoading(true);
        try {
            // let header = new Headers();
            // header.set('Content-Type', 'application/json');
            // header.set('Accept-Version', '1.0.0' );
            // header.set('Authorization', `Bearer ${auth.user.bearer}` );

            // const response = await fetch('http://192.168.1.25:5051/Admin/agregar/admin', {
            // method: 'POST',
            // headers: header,
            // body: JSON.stringify({ full_name, identification, email, password, rol }),
            // });
            // if (!response.ok) {
            // throw new Error('Error en la solicitud');
            // }
            const response = await axios.post(`http://${backendUrl}/Admin/agregar/admin`, {
                full_name,
                identification,
                email,
                password,
                rol
            }, 
            {
            headers: {
                'Content-Type': 'application/json',
                'Accept-Version' : '1.0.0',
                'Authorization': `Bearer ${auth.user.bearer}`,
            },
            });
            if (response.status != 201) {
                throw new Error('Error en la solicitud');
            }
            setIsTrue(true)

            } catch (error) {
                setIsError(true)
            } finally {
                setIsLoading(false);
            }
        };
    return (
        <>
            <Menu />
            <br /><br />
            <br /><br />
            
            {/* 
                full_name :"nuevo admin"
                identification : "98765432"
                email : "miguel@gmail.com"
                password : "admin1"
                rol : 1
            */}

            <div className={style.title_2}><span>Registrar nuevo administrador</span></div>
            <br /><br />
            { isError  &&  <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert sx={{ zIndex: '999' }} severity="error">
                <AlertTitle>Error</AlertTitle>
                <strong>Revisa los datos ingresados</strong>
            </Alert>
            </Stack>}
        { isTrue  &&  <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert sx={{ zIndex: '999' }} variant="filled" severity="success">
                administrador creado con exito!
            </Alert>
        </Stack>}
            <br /><br />
            <div className={style.formContainer}>
                <div className={style.form}>
                    <section className={style.bg_stars}>
                        <span className={style.star}></span>
                        <span className={style.star}></span>
                        <span className={style.star}></span>
                        <span className={style.star}></span>
                    </section>
                    <div className={style.inputsContainer}>
                        <div className={style.input_container}>
                            <input className={style.input_pwd}  type="text"  value={full_name} placeholder='nombre' onChange={(e) => setFullName(e.target.value)} />
                        </div>
                        <div className={style.input_container}>
                            <input className={style.input_pwd}  type="text" value={identification} placeholder='identificacion' onChange={(e) => setIdentification(e.target.value)} />
                        </div>
                        <div className={style.input_container}>
                            <input className={style.input_email} type="email" value={email} placeholder='email' onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className={style.input_container}>
                            <input className={style.input_pwd} type="password" value={password} placeholder='contraseña' onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <input type="hidden" value={rol} onChange={(e) => setRol(e.target.value)}/>
                    </div>
                    <br />
                    <button className={style.submit} value="login" onClick={sesionAdmin}>Enviar</button>
                </div>
                <br /><br />
                <div>
                {isLoading && <Loading />}
                </div>
            </div>


        </>
    )
}
