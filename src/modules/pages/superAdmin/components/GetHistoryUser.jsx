import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../auth/context/auth';
import styleTable from '../../../../assets/css/table.module.css';
import LoadingQuery from '../../../../shared/LoadingQuery';

let backendUrl = `${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}`;

export default function GetHistoryUser() {
    const auth = useAuth();

    let [isLoading, setIsLoading] = useState(false);
    let [books, setBooks] = useState([]);
    let [showTable, setShowTable] = useState(false);
    let [cedula, setCedula] = useState("");
    let [userNotFound, setUserNotFound] = useState(false);

    const listar = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://${backendUrl}/Product/listar/prestados/${cedula}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Version': '1.1.0',
                    'Authorization': `Bearer ${auth.user.bearer}`,
                }
            });
            if (response.status !== 200) {
                throw new Error("Error en la solicitud");
            }
            const booksData = response.data;
            
            if (booksData.length === 0) {
                setUserNotFound(true);
            } else {
                setUserNotFound(false);
                setBooks(booksData);
            }
        } catch (error) {
            console.error(error);
            setUserNotFound(true);
        } finally {
            setIsLoading(false);
        }
        setShowTable(true);
    }

    return (
        <>
            <input
                style={{ marginLeft: "1rem" }}
                type="text"
                placeholder="Ingrese la cédula"
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
            />
            <button onClick={listar}>Buscar</button>
            
            {userNotFound && (
                <h2 style={{ color: 'red', marginLeft : "2rem" }}>Usuario no encontrado</h2>
            )}

            {/* Verificar si se debe mostrar la tabla */}
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
                            {Array.isArray(books) ? (
                                books.map((product) => (
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
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="11">No hay resultados disponibles</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            <div className={styleTable.loadinQuery}>
                {isLoading && <LoadingQuery />}
            </div>
        </>
    );
}
