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
                <img src={rocket} className={style.rocket} alt="rocket"  width={400}/>
                </div>
            </div>
            <div className={`row ${style.sectionInfo}`}>
            </div>
            <BasicSpeedDial />
        </div>
        <Footer />
        </>
    );
    }
}

export default Home