import React from 'react'
import { useAuth } from '../../auth/context/auth';
import { useNavigate } from 'react-router-dom';
import { Menu } from '@/shared/Menu';


export default function SuperAdmin() {
  const navigate = useNavigate();
  const auth = useAuth();
  
  return (
    <>
    <Menu />
    <br /><br /><br />

      <h1>Perfil Super Admin</h1>
      <p>Hola, {auth.user.name}</p>
      <button value="ir" onClick={() => {
            navigate('/Registrer')
            }}>
            ir
      </button>
    </>
  )
}