import React, { useState } from 'react';
import axios from 'axios';
import Loading from '@/shared/Loading';
import { Menu } from '@/shared/Menu';
import { useAuth } from '../../../auth/context/auth';
import style from '../../../auth/assets/css/registrer.module.css'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

let backendUrl = `${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}`;

export default function NewProduct() {
    const auth = useAuth()

    let[title, setTittle] = useState('')
    let[description, setDescription] = useState('')
    let[type, setType] = useState('')
    let[status, setStatus] = useState('')
    let[author, setAuthor] = useState('')
    let[numberPages, setNumberPages] = useState('')
    let[image, setImage] = useState('')
    let [isLoading, setIsLoading] = useState(false);
    let [isError, setIsError] = useState(false);
    let [isTrue, setIsTrue] = useState(false);

    const sesionProduct = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(`http://${backendUrl}/Product/agregar/producto`, {
                title,
                description,
                type,
                status,
                author,
                numberPages,
                image
            }, 
            {
            headers: {
                'Content-Type': 'application/json',
                'Accept-Version' : '1.0.0',
                'Authorization': `Bearer ${auth.user.bearer}`,
            },
            });
            if (response.status != 201) {
                throw new Error('Error en la solicitud');
            }
            setIsTrue(true)

            } catch (error) {
                setIsError(true)
            } finally {
                setIsLoading(false);
            }
        };
        setTimeout(() => {
            setIsTrue(false);
        }, 2000);
        setTimeout(() => {
            setIsError(false);
        }, 10000);

    return (
        <>
            <Menu />
            <br /><br />
            <br />
            
            {/* 
                "title": "libro emprendedor 3",
                "description" : "en excelentes condiciones",
                "type": "libros",
                "status": "prestado",
                "start_date" : "2023-09-16",
                "final_date" : "2023-09-20",
                "user_identification" : "1098234098"   
            */}

            <div className={style.title_2}><span>Registrar nuevo producto</span></div>
            <br /><br />
            { isError  &&  <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert sx={{ zIndex: '999' }} severity="error">
                <AlertTitle>Error</AlertTitle>
                <strong>Revisa los datos ingresados</strong>
            </Alert>
            </Stack>}
        { isTrue  &&  <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert sx={{ zIndex: '999' }} variant="filled" severity="success">
                producto creado con exito!
            </Alert>
        </Stack>}
            <br /><br />
            <div className={style.formContainer}>
                <div className={style.form}>
                    <section className={style.bg_stars}>
                        <span className={style.star}></span>
                        <span className={style.star}></span>
                        <span className={style.star}></span>
                        <span className={style.star}></span>
                    </section>
                    <div className={style.inputsContainer}>
                        <div className={style.input_container}>
                            <input className={style.input_pwd}  type="text"  value={title} placeholder='titulo' onChange={(e) => setTittle(e.target.value)} />
                        </div>
                        <div className={style.input_container}>
                            <input className={style.input_pwd}  type="text" value={description} placeholder='descripción' onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div className={style.input_container}>
                            <input className={style.input_pwd}  type="text" value={author} placeholder='autor' onChange={(e) => setAuthor(e.target.value)} />
                        </div>
                        <div className={style.input_container}>
                            <input className={style.input_pwd}  type="text" value={numberPages} placeholder='Número de páginas' onChange={(e) => setNumberPages(e.target.value)} />
                        </div>
                        <div className={style.input_container}>
                            <input className={style.input_pwd}  type="text" value={image} placeholder='url de imagen' onChange={(e) => setImage(e.target.value)} />
                        </div>
                        <div className={style.input_container}>
                            <select className={style.input_pwd}  name="type" placeholder="Ingrese categoria" onChange={(e) => setType(e.target.value)}>
                                <option value="categoria">Categoria</option>
                                <option value="libros">Libros</option>
                                <option value="audifonos">Audifonos</option>
                            </select>
                        </div>  
                        <div className={style.input_container}>
                            <select className={style.input_pwd}  name="status" placeholder="Ingrese estado" onChange={(e) => setStatus(e.target.value)}>
                                <option value="estado">estado</option>
                                <option value="disponible">Disponible</option>
                                <option value="agotado">Agotado</option>
                                <option value="proximo">Proximo</option>
                            </select>
                        </div>  
                    </div>
                    <br />
                    <button className={style.submit} value="login" onClick={sesionProduct}>Enviar</button>
                </div>
                <br /><br />
                <div>
                {isLoading && <Loading />}
                </div>
            </div>
        </>
    )
}
