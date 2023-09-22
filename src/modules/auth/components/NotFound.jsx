import React from 'react'
import { useNavigate } from 'react-router-dom';
import style from '../assets/css/notfound.module.css'
import rocket from '../assets/img/rocket2.png'
import astro from '../assets/img/astro.png'


export default function NotFound() {
  const navigate = useNavigate();
  return (
    <>
    <div className={style.container}>
    <div className={style.rocket}>
      <img src={rocket} alt="" width={150}/>
    </div>
      <div data-js="astro" className={style.astronaut}>
        <img src={astro} alt="" width={250}/>

        
      </div>
      <h1 className={style.error}>error 404</h1>
      <br />
      <button value="login" onClick={() => {
            navigate(-1)
            }} className={style.btn}>
            Volver
      </button>
      </div>
    </>

  )
}