import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../auth/context/auth';
import styleTable from '../../../../assets/css/table.module.css'
import LoadingQuery from '../../../../shared/LoadingQuery';

let backendUrl = `${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}`;

export default function GetBooks() {
    const auth = useAuth();

    let [isLoading, setIsLoading] = useState(false);
    let [products, setProducts] = useState([]);
    let [showTable, setShowTable] = useState(false);
    let [isTrue, setIsTrue] = useState(false);
    let bearerAuth = auth.user.bearer
    

    const listar = async () => {
        setIsLoading(true);
        try {
        const response = await axios.get(`http://${backendUrl}/Product/listar`, {
            headers: {
            'Content-Type': 'application/json',
            'Accept-Version': '1.1.0',
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

    const lend = async (idProduct) => {
        try {
            const response2 = await axios.post(`http://${backendUrl}/Product/actualizar/producto/${idProduct}`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Version': '1.3.0',
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
        }
    };
    const post = async (idProduct) => {
        try {
            const response2 = await axios.post(`http://${backendUrl}/Product/actualizar/producto/${idProduct}`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Version': '1.3.0',
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
        }
    };
    setTimeout(() => {
        setIsTrue(false);
    }, 10000);
    useEffect(() => {
        listar();
    }, []);

    return (
    <>
        { isTrue  &&  <Stack sx={{ width: '100%', marginBottom : "2rem" }} spacing={2}>
        <Alert sx={{ zIndex: '999' }} variant="filled" severity="success">
            producto en estado prestado con exito!
        </Alert>
        </Stack>}
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
                            <button style={{padding : "3%"}} className={styleTable.buttonOpcion2} onClick={() => lend(product._id)}>Prestar</button>
                            <button style={{padding : "3%"}} className={styleTable.buttonOpcion2} onClick={() => lend(product._id)}>Reservar</button>
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
