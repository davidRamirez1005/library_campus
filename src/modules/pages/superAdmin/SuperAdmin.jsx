import React from 'react'
import { useAuth } from '../../auth/context/auth';
import { Menu } from '@/shared/Menu';


export default function SuperAdmin() {
  const auth = useAuth();
  return (
    <>
    <Menu />
    <br /><br /><br />

      <h1>Perfil Super Admin</h1>
      <p>Hola, {auth.user.name}</p>
    </>
  )
}