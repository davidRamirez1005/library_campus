import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../auth/context/auth';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import style from '../assets/css/get.module.css'
import imagen from '../../../../assets/img/logoCampus.png'


export default function ProductFavorite() {
    const auth = useAuth();
    let bearerAuth = auth.user.bearer;
    let [product, setProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const backendUrl = `${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}`;

    const listar = async () => {
    setIsLoading(true);
    try {
        const response = await axios.get(`http://${backendUrl}/Product/history`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept-Version': '1.1.0',
            'Authorization': `Bearer ${bearerAuth}`,
        },
        });
        if (response.statusText !== "OK") {
        throw new Error('Error en la solicitud');
        }
        const dataProduct = response.data;
        setProduct(dataProduct);
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

        {isLoading && (
            <div style={{ display : "flex",justifyContent: 'center' }}>
                <Stack spacing={1}  >
                <div style={{display : "flex", flexDirection : "row"}}>
                <Skeleton variant="circular" width={20} height={20} />
                <Skeleton variant="circular" width={20} height={20} />
                <Skeleton variant="circular" width={20} height={20} />
                </div>
                <Skeleton variant="rounded" width={350} height={350} />
                </Stack>
            </div>
        )}
        {!isLoading && <div style={{ display: 'flex', justifyContent: "center" }}>
                <div className={style.contentUser}>
                    <div className={style.tools}>
                        <span className={style.red}></span>
                        <div className={style.circle}>
                            <span className={style.yellow}></span>
                        </div>
                        <div className={style.circle}>
                            <span className={style.green}></span>
                        </div>
                    </div>
                    <ul style={{ paddingRight: 0 }}>
                        {product.map((producto) => (
                            <li key={producto._id.title} style={{ display: "grid", rowGap: "1rem", color: "white" }}>
                                <h2>Nombre: {producto._id.title}</h2>
                                <h2>Veces prestrado: {producto.count}</h2>
                                <img src={imagen} alt="" width={200 } />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>}
    </>
    );
}
