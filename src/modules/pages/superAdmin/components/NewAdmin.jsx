import React, { useState } from 'react';
import Loading from '@/shared/Loading';
import { Menu } from '@/shared/Menu';
import { useAuth } from '../../../auth/context/auth';

export default function NewAdmin() {
  const auth = useAuth();

  let [full_name, setFullName] = useState('nuevo admin')
  let [identification, setIdentification] = useState('123654788')
  let [email, setEmail] = useState('nuevo@example.com')
  let [password, setPassword] = useState('secreto')
  let [rol, setRol] = useState(1)
  let [isLoading, setIsLoading] = useState(false);

  const sesionAdmin = async () => {
      setIsLoading(true);
      try {
          let header = new Headers();
          header.set('Content-Type', 'application/json');
          header.set('Accept-Version', '1.0.0' );
          header.set('Authorization', `Bearer ${auth.user.bearer}` );
  
          const response = await fetch('http://127.10.10.1:5051/Admin/agregar/admin', {
          method: 'POST',
          headers: header,
          body: JSON.stringify({ full_name, identification, email, password, rol }),
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
          full_name :"nuevo admin"
          identification : "98765432"
          email : "miguel@gmail.com"
          password : "admin1"
          rol : 1
      */}

      <h1>Registrar nuevo administrador</h1>
      <br />
      <input type="text"  value={full_name} placeholder='nombre' onChange={(e) => setFullName(e.target.value)} />
      <input type="text" value={identification} placeholder='identificacion' onChange={(e) => setIdentification(e.target.value)} />
      <input type="password" value={email} placeholder='email' onChange={(e) => setEmail(e.target.value)} />
      <input type="text" value={password} placeholder='telefono' onChange={(e) => setPassword(e.target.value)}/>
      <input type="hidden" value={rol} onChange={(e) => setRol(e.target.value)}/>
      <br />
      <button value="login" onClick={sesionAdmin}>Enviar</button>
      <br /><br />
      {isLoading && <Loading />}


  </>
)
}
