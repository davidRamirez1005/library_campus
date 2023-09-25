import React from 'react'
import { useAuth } from '../../auth/context/auth';
import { Menu } from '@/shared/Menu';
import styleContext from '../../auth/assets/css/registrer.module.css'


export default function Client() {
    const auth = useAuth();

return (
    <div>
        <Menu />
        <br /><br /><br /><br />

<div className={styleContext.title_2}><span>Perfil Camper</span></div>
<br />
<div className={styleContext.form_title}><span>Hola, {auth.user.username}</span></div>
    </div>
    )
}
