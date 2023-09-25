import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../auth/context/auth';
import styleTable from '../../../../assets/css/table.module.css'
import LoadingQuery from '../../../../shared/LoadingQuery';

let backendUrl = `${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}`;

export default function GetProducts() {
    const auth = useAuth();

    let [isLoading, setIsLoading] = useState(false);
    let [products, setProducts] = useState([]);
    let [showTable, setShowTable] = useState(false);
    

    const listar = async () => {
        setIsLoading(true);
        try {
        const response = await axios.get(`http://${backendUrl}/Product/listar`, {
            headers: {
            'Content-Type': 'application/json',
            'Accept-Version': '1.0.0',
            'Authorization': `Bearer ${auth.user.bearer}`,
            },
        });
        if (response.status != 200) {
            throw new Error('Error en la solicitud');
        }
        const productsData = response.data;
        setProducts(productsData);
        } catch (error) {
            alert('error en la consulta');
        } finally {
        setIsLoading(false);
        }
        setShowTable(!showTable);
    };

    useEffect(() => {
        listar();
    }, []);

    return (
    <>
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
                        <td><button>actualizar</button> <button>eliminar</button></td>
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
