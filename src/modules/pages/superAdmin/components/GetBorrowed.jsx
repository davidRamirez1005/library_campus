import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../auth/context/auth';
import styleTable from '../../../../assets/css/table.module.css'
import LoadingQuery from '../../../../shared/LoadingQuery';

let backendUrl = `${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}`;


export default function GetBorrowed() {
    const auth = useAuth();

    let[isLoading, setIsloading] = useState(false)
    let[books, setBooks] = useState(false)
    let [showTable, setShowTable] = useState(false);

    const listar = async () => {
        setIsloading(true)
        try {
            const response = await axios.get(`http://${backendUrl}/Product/listar/prestados`, {
                headers : {
                    'Content-Type': 'application/json',
                    'Accept-Version': '1.2.0',
                    'Authorization': `Bearer ${auth.user.bearer}`,
                }
            })
            if (response.status != 200){
                throw new Error("Error en la solicitud")
            }
            const booksData = response.data
            setBooks(booksData)
        } catch (error) {
            return alert('error en la consulta')
        } finally{
            setIsloading(false)
        }
        setShowTable(!showTable)
    }

    useEffect(()=>{
        listar()
    }, [])
    return (
        <>
    {showTable && (
            <div className={styleTable.tableContainer}>
                <table className={styleTable.table}>
                <thead>
                    <tr>
                    <th>Título</th>
                    <th>Descripción</th>
                    <th>Tipo</th>
                    <th>Estado</th>
                    <th>Inicio</th>
                    <th>Fin</th>
                    <th>nombre</th>
                    <th>cc</th>
                    <th>Email</th>
                    <th>Telefono</th>
                    <th>Team</th>

                    </tr>
                </thead>
                <tbody>
                    {books.map((product) => (
                    <tr key={product._id}>
                        <td>{product.title}</td>
                        <td>{product.description}</td>
                        <td>{product.type}</td>
                        <td>{product.status}</td>
                        <td>{product.start_date}</td>
                        <td>{product.final_date}</td>
                        <td>{product.user[0].username}</td>
                        <td>{product.user[0].identification}</td>
                        <td>{product.user[0].email}</td>
                        <td>{product.user[0].phone}</td>
                        <td>{product.user[0].team}</td>
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
