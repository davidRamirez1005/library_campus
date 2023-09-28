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
    const [users, setUsers] = useState([]); // Nuevo estado para almacenar los usuarios

    const backendUrl = `${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}`;

    const handleChange = () => {
        setChecked((prev) => !prev);
    };

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
            alert('Error en la consulta');
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
                            <div style={{ backgroundColor: "red", color: "white", padding: "0.5%" }} className="card">
                                <ul>
                                    <li style={{display:"grid", rowGap : "1rem"}}>
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
            </Box>
        </>
    );
}
