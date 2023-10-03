import axios from 'axios';
import { Menu } from '@/shared/Menu';
import React, { useState } from 'react';
import Loading from '@/shared/Loading';
import style from '../assets/css/registrer.module.css'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';


let backendUrl = `${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}`;

export default function Registrer() {

    let [username, setName] = useState('')
    let [identification, setIdentification] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [phone, setPhone] = useState('')
    let [team, setTeam] = useState('')
    let [rol, setRol] = useState(2)
    let [isLoading, setIsLoading] = useState(false);
    let [isError, setIsError] = useState(false);
    let [isTrue, setIsTrue] = useState(false);



    const sesion = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(`http://${backendUrl}/newUser/agregar/user`, {
                username,
                identification,
                email,
                password,
                phone,
                team,
                rol
            }, 
            {
            headers: {
                'Content-Type': 'application/json',
                'Accept-Version' : '1.0.0'
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
        setTimeout(() => {
            setIsTrue(false);
        }, 21000);
        setTimeout(() => {
            setIsError(false);
        }, 10000);
return (
    <>
        <Menu />
        <br /><br /><br />
        
        
        {/* 
        "username": "usuario nuevo",
        "identification" : "44444444",
        "email": "nuevo@example.com",
        "password": "secreto",
        "phone": "3214567890",
        "team": "J2",
        "rol" : 2 
        */}

        <div className={style.title_2}><span>REGISTRARSE</span></div>
        <br /><br />
        <div>
        { isError  &&  <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert sx={{ zIndex: '999' }} severity="error">
                <AlertTitle>Error</AlertTitle>
                <strong>Revisa los datos ingresados</strong>
            </Alert>
        </Stack>}
        { isTrue  &&  <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert sx={{ zIndex: '999' }} variant="filled" severity="success">
            Usuario creado con exito!
        </Alert>
        </Stack>}
        </div>
        <br />
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
                <input className={style.input_pwd}  type="text"  value={username} placeholder='nombre' onChange={(e) => setName(e.target.value)} />
            </div>
            <div className={style.input_container}>
                <input className={style.input_pwd}  type="text" value={identification} placeholder='identificacion' onChange={(e) => setIdentification(e.target.value)} />
            </div>
            <div className={style.input_container}>
                <input className={style.input_email} type="email" value={email} placeholder='email' onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className={style.input_container}>
                <input className={style.input_pwd} type="password" value={password} placeholder='contraseña' onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className={style.input_container}>
            <input className={style.input_pwd}  type="text" value={phone} placeholder='telefono' onChange={(e) => setPhone(e.target.value)}/>
            </div>
            <div className={style.input_container}>
                <select className={style.input_pwd}  name="team" placeholder="Ingrese team" onChange={(e) => setTeam(e.target.value)}>
                    <option value="seleccionar">Selecciona un Team</option>
                    <option value="M3">M3</option>
                    <option value="M1">M1</option>
                </select>
            </div>  
            </div>
        
        <input type="hidden" value={rol} onChange={(e) => setRol(e.target.value)}/>
        <br />
        <button className={style.submit} value="login" onClick={sesion}>Enviar</button>
        </div>
        <br /><br />
        {isLoading && <Loading />}
        </div>
        


    </>
)
}
