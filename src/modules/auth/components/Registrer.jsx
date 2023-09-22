import { Menu } from '@/shared/Menu';
import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import Loading from '@/shared/Loading';
// import { useAuth } from '../context/auth';


export default function Registrer() {
    const navigate = useNavigate();

    let [username, setName] = useState('')
    let [identification, setIdentification] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [phone, setPhone] = useState('')
    let [team, setTeam] = useState('')
    let [rol, setRol] = useState('')

    // const sesion = const login = async () => {
    //     setIsLoading(true);
    //     try {
    //         let header = new Headers();
    //         header.set('Content-Type', 'application/json');
    //         header.set('Authorization', `Bearer ${token}` );
    
    //         const response = await fetch('http://127.10.10.1:5051/login', {
    //         method: 'POST',
    //         headers: header,
    //         body: JSON.stringify({ ROL_EMAIL, ROL_PASSWORD }),
    //         });
    
    //         if (!response.ok) {
    //         throw new Error('Error en la solicitud');
    //         }
            
    //         const data = await response.json();
    //         setToken(data.Token);
    //         console.log(data);
    //         const NAME = data.result.full_name
    //         const USERNAME = data.result.username
    //         const ROL = data.result.rol
    
    //         if (!data.Token) {
    //             console.log('Verifica los datos ingresados');
    //         } else {
    //             auth.logins({ email: ROL_EMAIL, name : NAME , rol : ROL, username : USERNAME});
    //             switch (data.result.rol) {
    //                 case 1:
    //                     navigate('/Admin');
    //                     break;
    //                 case 2:
    //                     navigate('/Client');
    //                     break;
    //                 case 3:
    //                     navigate('/SuperAdmin');
    //                     break;
    //                 default:
    //                     break;
    //             }
    //         }
    //         } catch (error) {
    //             alert('Verifica los datos ingresados');
    //             error
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };





return (
    <>
        <Menu />
        <br /><br />
        
        {/* "username": "usuario nuevo",
        "identification" : "44444444",
        "email": "nuevo@example.com",
        "password": "secreto",
        "phone": "3214567890",
        "team": "J2",
        "rol" : 2 */}

        <h1>Registrarse</h1>
        <br />
        <input type="text" placeholder='nombre' />
        <input type="text" placeholder='identificacion' />
        <input type="password" placeholder='contraseña' />
        <input type="text" placeholder='telefono' />
        <input type="text" placeholder='team' />
        <input type="text" placeholder='rol' />
        <br />
        <button>Enviar</button>


    </>
)
}
