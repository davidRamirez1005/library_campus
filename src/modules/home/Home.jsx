import React, { useState,useEffect } from 'react';
import book from '../../assets/img/book.png'
import star from '../../assets/img/star.png'
import rocket from '../../assets/img/rocket.png'
import style from '@/assets/css/home.module.css'
import { Menu } from '@/shared/Menu';
import  Loader  from '@/shared/Loader';
import Wave from '../utils/Wave';
import Footer from '../../shared/Footer';
import BasicSpeedDial from '../utils/BasicSpeedDial';
import CardCoding from '../utils/CardCoding';
import phone from '../../assets/img/phone.png'


function Home() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 600);
    setIsLoading(true);
    }, []);

    if (isLoading) {
    return <Loader />;
    } else {
    return (
        <>
        <Menu />
        <br /><br /><br /><br />
        <div className={style.imgBook}>
            <div className={style.background}></div>
            <img src={book} className={style.book} alt="book"  width={300}/>
        </div>
        <h1 className={style.tittleHome}>LIBRERIA CAMPUS</h1>
        <Wave />
        <div className={style.container}>
            <div className="row">
                <div className={`col ${style.starContainer}`}>
                    <img src={star} className={style.star} alt="star"  width={100}/>
                </div>
                <div className="col">
                <h2 className={style.subtittleHome}>Objetivos</h2>
                </div>
            </div>
            <div className="row" style={{display : "flex", justifyContent : "center", margin : "3rem"}}>
                <div className={`col-8 ${style.h3Container}`} style={{display : "flex", justifyContent : "center", gap : "2rem", margin : "2%", alignItems : "center"}}>
                <h3>Implementar un sistema de gestión de préstamos eficiente</h3>
                <h3>Garantizar la seguridad y la privacidad de los datos</h3>
                <h3>Diseñar una interfaz amigable que permita a los usuarios navegar con facilidad</h3>
                </div>
                <div className="col" style={{display : "flex", justifyContent : "center"}}>
                <img src={rocket} className={style.rocket} alt="rocket"  width={320}/>
                </div>
            </div>
            <div className={`row ${style.sectionInfo}`}>
                <div style={{display : "flex", justifyContent : "center",width: "-webkit-fill-available"}}>
                    <img className={style.phone} src={phone} alt="phone"/>
                </div>
                <div className="col">
                <br /><br /><br />
                    <h3 style={{justifyContent : "center", display : "flex"}}>¿Cómo Solicitar una RESERVA?</h3>
                    <br />
                    <p>Para solicitar una reserva de libros, sigue estos sencillos pasos:</p>
                    <ol>
                        <li>Regístrate en nuestro sitio web si aún no tienes una cuenta.</li>
                        <li>Inicia sesión en tu cuenta.</li>
                        <li>Busca que libro esta disponible y solicita la reserva</li>
                        <li>Haz clic en el botón "Solicitar reserva" en la casilla correspondiente del libro.</li>
                        <li>Selecciona la fecha para la reserva y confirma tu solicitud.</li>
                    </ol>
                    <p>¡Listo! Tu solicitud de reserva se procesará y lo podrás reclamar con el encargado de libros.</p>
                </div>
                <div className="col">
                <br /><br /><br />
                    <h3 style={{justifyContent : "center", display : "flex"}}>¿Cómo Solicitar un PRESTAMO?</h3>
                    <br />
                    <p>Para solicitar un prestamo de libros, sigue estos sencillos pasos:</p>
                    <ol>
                        <li>Regístrate en nuestro sitio web si aún no tienes una cuenta.</li>
                        <li>Inicia sesión en tu cuenta.</li>
                        <li>Busca que libro esta disponible y dirijete al encargado de prestar libros</li>
                        <li>Informa tu documento de identidad, fecha de inicio y fin del prestamo.</li>
                    </ol>
                    <p>¡Listo! Tu solicitud de prestamo se procesará y recibirás una confirmación.</p>
                </div>
            </div>
            <CardCoding />
            <BasicSpeedDial />
        </div>
        <Footer />
        </>
    );
    }
}

export default Home