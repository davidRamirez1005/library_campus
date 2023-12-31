import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../auth/context/auth';
import styleTable from '../../../../assets/css/table.module.css'
import LoadingQuery from '../../../../shared/LoadingQuery';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import { ImBell } from "react-icons/im";
import { ImProfile } from "react-icons/im";

let backendUrl = `${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}`;

export default function GetProductsUser() {
    const auth = useAuth();

    let [isLoading, setIsLoading] = useState(false);
    let [products, setProducts] = useState([]);
    let [showTable, setShowTable] = useState(false);
    let [isTrue, setIsTrue] = useState(false);
    let [open, setOpen] = useState(false);
    let[start_date, setStart] = useState('')
    let[final_date, setFinal] = useState('')
    let[productImage, setIProductImage] = useState('')
    let[productTittle, setIProductTittle] = useState('')
    let[productDescription, setIProductDescription] = useState('')
    let[author, setIAuthor] = useState('')
    let[numberPages, setINumberPages] = useState('')
    let[descripctionModal, setDescripctionModal] = useState(false)
    let[identification, setIdentification] = useState(auth.user.identification)
    let[productId, setIProductId] = useState(0)
    let [reload, setReload] = useState(0);
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

    const reserve = async (idProduct, idUser) => {
        try {
            const response = await axios.put(`http://${backendUrl}/Product/actualizar/producto/${idProduct}/${idUser}`, {
                start_date,
                final_date,

            }, 
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Version': '1.5.0',
                    'Authorization': `Bearer ${bearerAuth}`,
                },
            });
            if (response.status === 404) {
                return alert('usuario no registrado');
            } else if (response.status === 400) {
                return alert('la fecha final no puede ser menor a la fecha de inicio');
            } else if (response.status !== 202) {
                throw new Error('Error en la solicitud');
            }
            setIsTrue(true)
        } catch (error) {
            if (error.response && error.response.status === 404) {
                return alert('usuario no registrado');
            }else if (error.response && error.response.status === 400){
                return alert('la fecha final no puede ser menor a la fecha de inicio');
            }
            console.log(error);
            return alert('error en la consulta');
        }finally {
            setReload(reload + 1)
        }
    };
    setTimeout(() => {
        setIsTrue(false);
    }, 20000);
    
    useEffect(() => {
        listar();
    }, [reload]);

    return (
    <>
        <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog>
            <DialogTitle>Producto </DialogTitle>
            <DialogContent>Ingresar datos para la solicitud.</DialogContent>
            <form
                onSubmit={(event) => {
                event.preventDefault();
                setOpen(false);
                }}
            >
                <Stack spacing={2}>
                <FormControl>
                    <FormLabel>id product</FormLabel>
                    <Input  value={productId} onChange={(e) => setIProductId(e.target.value)} autoFocus disabled />
                </FormControl>
                <FormControl>
                    <FormLabel>Identificacion</FormLabel>
                    <Input value={identification} onChange={(e) => setIdentification(e.target.value)} autoFocus disabled />
                </FormControl>
                <FormControl>
                    <FormLabel>Fecha inicio</FormLabel>
                    <Input value={start_date} onChange={(e) => setStart(e.target.value)} type='date' required />
                </FormControl>
                <FormControl>
                    <FormLabel>Fecha entrega</FormLabel>
                    <Input value={final_date} onChange={(e) => setFinal(e.target.value)} type='date' required />
                </FormControl>
                <Button onClick={() => reserve(productId, identification)} style={{backgroundColor : "#c0c0c0", color : "#144272"}}><ImProfile/>Reservar</Button>
                </Stack>
            </form>
            </ModalDialog>
        </Modal>

        {/* modal descripcion */}
        <Modal open={descripctionModal} onClose={() => setDescripctionModal(false)}>
            
            <ModalDialog
            variant="soft"
            sx={{overflow: "auto", borderRadius : "27px", backgroundColor : "#B1D0E0"}}
            >
                <div style={{display : "flex", justifyContent : "center", alignContent : "center", flexDirection : "column", height : "auto", flexWrap : "wrap", rowGap : "1rem"}}>
                    <img style={{display : "flex", alignSelf : "center", borderRadius : "18px", maxWidth : "500px"}} src={productImage} alt="" width={"60%"} />
                    <h3>Libro:</h3>
                    <DialogTitle>{productTittle}</DialogTitle>
                    <h3>Descripcion:</h3>
                    <DialogContent>{productDescription}</DialogContent>
                    <h3>Autor:</h3>
                    <DialogContent>{author}</DialogContent>
                    <h3>Numero de páginas:</h3>
                    <DialogContent>{numberPages}</DialogContent>
                </div>
            </ModalDialog>
        </Modal>


        { isTrue  &&  <Stack sx={{ width: '100%', marginBottom : "2rem" }} spacing={2}>
        <Alert sx={{ zIndex: '999' }} variant="filled" severity="success">
            Se ha aceptado la solicitud con exito!
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
                        <td>{product.description} <button style={{borderRadius : "12px", border : "none", cursor : "pointer"}} onClick={() =>{
                            setIProductTittle(product.title),
                            setIProductDescription(product.description),
                            setIProductImage(product.image),
                            setIAuthor(product.author),
                            setINumberPages(product.numberPages),
                            setDescripctionModal(true)
                        }}>Ver más</button></td>
                        <td>{product.type}</td>
                        <td>{product.status}</td>
                        <td>
                            {product.status === "disponible" ? <button className={styleTable.buttonOpcion2} onClick={() => {setOpen(true), setIProductId(product._id)}}> <ImBell/>Reservar</button>: null}
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
