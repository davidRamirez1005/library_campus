import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../auth/context/auth';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Grow from '@mui/material/Grow';
import FormControlLabel from '@mui/material/FormControlLabel';
import LoadingQuery from '../../../../shared/LoadingQuery';

const icon = (
    <Paper sx={{ m: 1, width: 100, height: 100 }} elevation={4}>
        <svg>
        <Box
            component="polygon"
            points="0,100 50,00, 100,100"
            sx={{
            fill: (theme) => theme.palette.common.white,
            stroke: (theme) => theme.palette.divider,
            strokeWidth: 1,
            }}
        />
        </svg>
    </Paper>
);

let backendUrl = `${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}`;

export default function GetUsers() {
    const auth = useAuth();

    let bearerAuth = auth.user.bearer
    let [isLoading, setIsLoading] = useState(false);
    const [checked, setChecked] = React.useState(false);

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
        if (response.status != 200) {
            throw new Error('Error en la solicitud');
        }
        const productsData = response.data;
        setProducts(productsData);
        } catch (error) {
            return alert('error en la consulta');
        } finally {
        setIsLoading(false);
        }
        setShowTable(!showTable);
    };

return (
        <Box sx={{ height: 180 }}>
        <FormControlLabel
            control={<Switch checked={checked} onChange={handleChange} />}
            label="Show"
        />
        <Box sx={{ display: 'flex', gap: "1.2rem"}}>
            <Grow in={checked}><h3>hssauhd</h3></Grow>
            <Grow
            in={checked}
            style={{ transformOrigin: '0 0 0' }}
            {...(checked ? { timeout: 1000 } : {})}
            >
            <div style={{backgroundColor : "red", color : "white", padding : "3%"}} className="card">
                <ul>
                    <li>

                    </li>
                </ul>
            </div>
            </Grow>
        </Box>
        </Box>
    );
}