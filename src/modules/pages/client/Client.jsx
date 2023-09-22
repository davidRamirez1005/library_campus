import React from 'react'
import { useAuth } from '../../auth/context/auth';
import { Menu } from '@/shared/Menu';


export default function Client() {
    const auth = useAuth();

return (
    <div>
        <Menu />
        <br /><br /><br />
        <h1>hola usuario</h1>
        <p>Hola, {auth.user.username}</p>
    </div>
    )
}
