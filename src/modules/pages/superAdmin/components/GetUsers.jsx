import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../auth/context/auth';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import LoadingQuery from '../../../../shared/LoadingQuery';
import Grow from '@mui/material/Grow';
import FormControlLabel from '@mui/material/FormControlLabel';
import style from '../assets/css/get.module.css'

export default function GetUsers() {
    
    const auth = useAuth();
    let bearerAuth = auth.user.bearer;
    const [isLoading, setIsLoading] = useState(false);
    const [checked, setChecked] = React.useState(false);
    const [users, setUsers] = useState([]);
    const [sigui, setUSigui] = useState(false);
    
    const backendUrl = `${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}`;
    
    const handleChange = () => {
        setChecked((prev) => !prev);
        setUSigui((estado) => !estado);
    };
    
    // setUSigui(false)
    const listar = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://${backendUrl}/User/listar/user`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Version': '1.0.0',
                    'Authorization': `Bearer ${bearerAuth}`,
                },
            });
            if (response.status !== 200) {
                throw new Error('Error en la solicitud');
            }
            const usersData = response.data;
            setUsers(usersData);
        } catch (error) {
            return alert('Error en la consulta');
            
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        listar();
    }, []);

    return (
        <>
            <Box sx={{ height: 180 }}>
                <FormControlLabel
                    control={<Switch checked={checked} onChange={handleChange} />}
                    label={checked ? "Ocultar" : "Ver"}
                />
                <Box sx={{ display: 'flex', gap: "1rem", flexWrap: 'wrap', marginLeft : "1.2rem" }}>
                    {isLoading && <LoadingQuery />}
                    {users.map((user) => (
                        <Grow
                            in={checked}
                            style={{ transformOrigin: '0 0 0' }}
                            {...(checked ? { timeout: 1000 } : {})}
                            key={user._id}
                        >
                            <div className={style.contentUser}>
                            <div className={style.tools}>
                                <span className={style.red}></span>
                                <div className={style.circle}>
                                <span  className={style.yellow}></span>
                                </div>
                                <div className={style.circle}>
                                <span  className={style.green}></span>
                                </div>
                            </div>
                                <ul style={{paddingRight : 0}}>
                                    <li style={{display:"grid", rowGap : "1rem", color : "white"}}>
                                        <div>{user.username}</div>
                                        <div>{user.identification}</div>
                                        <div>{user.email}</div>
                                        <div>{user.phone}</div>
                                        <div>{user.team}</div>
                                    </li>
                                </ul>
                            </div>
                        </Grow>
                        
                        ))}
                </Box>
                <br />
                <div style={{display : "flex", justifyContent : "center", }}>
                {sigui && <div style={{display : "flex", gap : "1rem"}}>
                    <button style={{borderRadius : "10px", border : "transparent", padding : "2px",cursor : "pointer"}} >atras</button>
                    <button style={{borderRadius : "10px", border : "transparent", padding : "2px",cursor : "pointer"}} >siguiente</button>
                </div> } 
                </div>
            </Box>
            
        </>
    );
}
