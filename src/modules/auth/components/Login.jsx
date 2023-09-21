import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import Loading from '@/shared/Loading';
import { useAuth } from '../context/auth';



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
    <input
        type="text"
        value={ROL_EMAIL}
        onChange={(e) => getMail(e.target.value)}
        placeholder="email"
    />
    <input
        type="text"
        value={ROL_PASSWORD}
        onChange={(e) => getCon(e.target.value)}
        placeholder="contraseña"
    />

    <br />
    <br />
    <button value="login" onClick={login} >
        ENVIAR
    </button>
    {isLoading && <Loading />}
    <div className="row">
        <div className="col">

        </div>
        <div className="col">

        </div>
    </div>

</div>
);
}