import { Menu } from '@/shared/Menu';
import React, { useState } from 'react';
import Loading from '@/shared/Loading';


export default function Registrer() {

    let [username, setName] = useState('usuario nuevo')
    let [identification, setIdentification] = useState('44444444')
    let [email, setEmail] = useState('uevo@example.com')
    let [password, setPassword] = useState('secreto')
    let [phone, setPhone] = useState('3214567890')
    let [team, setTeam] = useState('')
    let [rol, setRol] = useState(2)
    let [isLoading, setIsLoading] = useState(false);

    const sesion = async () => {
        setIsLoading(true);
        try {
            let header = new Headers();
            header.set('Content-Type', 'application/json');
            header.set('Accept-Version', '1.0.0' );
    
            const response = await fetch('http://127.10.10.1:5051/newUser/agregar/user', {
            method: 'POST',
            headers: header,
            body: JSON.stringify({ username, identification, email, password, phone, team, rol }),
            });
    
            if (!response.ok) {
            throw new Error('Error en la solicitud');
            }
            alert("nuevo usuario creado con exito")

            } catch (error) {
                alert('Verifica los datos ingresados');
                error
            } finally {
                setIsLoading(false);
            }
        };
        
return (
    <>
        <Menu />
        <br /><br />
        
        {/* 
        "username": "usuario nuevo",
        "identification" : "44444444",
        "email": "nuevo@example.com",
        "password": "secreto",
        "phone": "3214567890",
        "team": "J2",
        "rol" : 2 
        */}

        <h1>Registrarse</h1>
        <br />
        <input type="text"  value={username} placeholder='nombre' onChange={(e) => setName(e.target.value)} />
        <input type="text" value={identification} placeholder='identificacion' onChange={(e) => setIdentification(e.target.value)} />
        <input type="password" value={email} placeholder='email' onChange={(e) => setEmail(e.target.value)} />
        <input type="text" value={password} placeholder='telefono' onChange={(e) => setPassword(e.target.value)}/>
        <input type="text" value={phone} placeholder='telefono' onChange={(e) => setPhone(e.target.value)}/>
        {/* <input type="text" value={team} placeholder='team' onChange={(e) => setTeam(e.target.value)} /> */}
        <select name="team" placeholder="Ingrese team" onChange={(e) => setTeam(e.target.value)}>
            <option value="seleccionar">Selecciona un Team</option>
            <option value="M3">M3</option>
            <option value="M1">M1</option>
        </select>
        <input type="hidden" value={rol} onChange={(e) => setRol(e.target.value)}/>
        <br />
        <button value="login" onClick={sesion}>Enviar</button>
        <br /><br />
        {isLoading && <Loading />}


    </>
)
}
