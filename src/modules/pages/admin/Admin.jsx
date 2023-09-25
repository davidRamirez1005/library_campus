import React from 'react'
import { useAuth } from '../../auth/context/auth';
import { Menu } from '@/shared/Menu';
import styleContext from '../../auth/assets/css/registrer.module.css'

export default function Admin() {
    const auth = useAuth();

return (
    <>
        <Menu />
        <br /><br /><br /><br />

<div className={styleContext.title_2}><span>Perfil Administrador</span></div>
<br />
<div className={styleContext.form_title}><span>Hola,{auth.user.name}</span></div>
    </>
    )
}
