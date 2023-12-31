import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../auth/context/auth';
import styleTable from '../../../../assets/css/table.module.css'
import LoadingQuery from '../../../../shared/LoadingQuery';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import { ImBin } from "react-icons/im";
import { ImHourGlass } from "react-icons/im";
import { ImSpinner10 } from "react-icons/im";



let backendUrl = `${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}`;

export default function GetProducts() {
    const auth = useAuth();

    let [isLoading, setIsLoading] = useState(false);
    let [products, setProducts] = useState([]);
    let [showTable, setShowTable] = useState(false);
    let [isTrue, setIsTrue] = useState(false);
    let [isAvaliable, setIsAvaliable] = useState(false);
    let [open, setOpen] = useState(false);
    let [a, setA] = useState(0);
    

    let bearerAuth = auth.user.bearer
    const listar = async () => {
        setIsLoading(true);
        try {
        const response = await axios.get(`http://${backendUrl}/Product/listar`, {
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
        setShowTable(true);
    };
    const updateExhaust = async (idProduct) => {
        try {
            const response2 = await axios.put(`http://${backendUrl}/Product/actualizar/producto/${idProduct}`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Version': '1.1.0',
                    'Authorization': `Bearer ${bearerAuth}`,
                },
            });
        if (response2.status != 202) {
            throw new Error('Error en la solicitud');
        }
        setIsTrue(true)
        } catch (error) {
            console.log(error);
            return alert('error en la consulta');
        } finally {
            setA(a + 1)
        }
    };
    const updateAvaliable = async (idProduct) => {
        try {
            const response3 = await axios.put(`http://${backendUrl}/Product/actualizar/producto/${idProduct}`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Version': '1.2.0',
                    'Authorization': `Bearer ${bearerAuth}`,
                },
            });
        if (response3.status != 202) {
            throw new Error('Error en la solicitud');
        }
        setIsAvaliable(true)
        } catch (error) {
            console.log(error);
            return alert('error en la consulta');
        } finally {
            setA(a + 1)
        }
    };
    const deleteProduct = async (idProduct) => {
        
        try {
            const response3 = await axios.delete(`http://${backendUrl}/Product/eliminar/producto/${idProduct}`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Version': '1.1.0',
                    'Authorization': `Bearer ${bearerAuth}`,
                },
            });
        if (response3.status != 202) {
            throw new Error('Error en la solicitud');
        }
        setOpen(true)
        } catch (error) {
            console.log(error);
            return alert('error en la consulta');
        } finally {
            setA(a + 1)
        }
    };
    setTimeout(() => {
        setIsTrue(false);
    }, 11000);
    setTimeout(() => {
        setIsAvaliable(false);
    }, 11000);
    useEffect(() => {
        listar();
    }, [a]);
    return (
    <>
    { isTrue  &&  <Stack sx={{ width: '100%', marginBottom : "2rem" }} spacing={2}>
            <Alert  sx={{ zIndex: '999' }} variant="filled" severity="success">
                producto en estado agotado con exito!
            </Alert>
        </Stack>}
    { isAvaliable  &&  <Stack sx={{ width: '100%', marginBottom : "2rem" }} spacing={2}>
            <Alert  sx={{ zIndex: '999' }} variant="filled" severity="success">
                producto en estado disponible con exito!
            </Alert>
        </Stack>}
    { open && <Snackbar open={open} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '30%' }}>
            Producto eliminado con exito
        </Alert>
        </Snackbar>
    }
    {showTable && (
            <div className={styleTable.tableContainer}>
                <table className={styleTable.table}>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Título</th>
                    <th>Descripción</th>
                    <th>Tipo</th>
                    <th>Estado</th>
                    <th>opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                    <tr key={product._id}>
                        <td>{product._id}</td>
                        <td>{product.title}</td>
                        <td>{product.description}</td>
                        <td>{product.type}</td>
                        <td>{product.status}</td>
                        <td>
                            {product.status !== "disponible" ? <button className={styleTable.buttonOpcion2} onClick={() => updateAvaliable(product._id)}><ImSpinner10 /> Disponible</button> : null}
                            {product.status !=="agotado" ? <button className={styleTable.buttonOpcion2} onClick={() => updateExhaust(product._id)}><ImHourGlass/> Agotar</button> : null}
                            
                            <button className={styleTable.buttonOpcion2} onClick={() => deleteProduct(product._id)}><ImBin/> Eliminar</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        )}
        <div className={styleTable.loadinQuery}>
            {isLoading && <LoadingQuery />}
        </div>
    </>
    )
}
