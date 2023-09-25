import React, { useState } from 'react';
import { useAuth } from '../../auth/context/auth';
import { useNavigate } from 'react-router-dom';
import { Menu } from '@/shared/Menu';
import style from './assets/css/inicio.module.css'
import styleContext from '../../auth/assets/css/registrer.module.css'
import { FaUserAlt } from "react-icons/fa";
import { FaShoppingBasket } from "react-icons/fa";
import GetProducts from './components/GetProducts';
import GetBooks from './components/GetBoooks';

export default function SuperAdmin() {
  const navigate = useNavigate();
  const auth = useAuth();

  const [showProducts, setShowProducts] = useState(false);
  const [showBooks, setShowBooks] = useState(false);

  const handleShowProducts = () => {
    setShowProducts(!showProducts);
  };
  
  const handleShowBooks = () => {
    setShowBooks(!showBooks);
  };

  return (
    <>
    <Menu />
    <br /><br /><br /><br />

    <div className={styleContext.title_2}><span>Perfil Super Admin</span></div>
    <br />
    <div className={styleContext.form_title}><span>Hola, {auth.user.name}</span></div>
    <br /><br />
    <div className={style.btnRegistrer}>
      <button className={style.button_aggregate} value="registrar" onClick={() => {
              navigate('/RegistrerAdmin')
              }}>
          <div className="svg_wrapper_1">
              <div className="svg_wrapper">
                  <FaUserAlt/>
              </div>
          </div>
          <span>Agregar Admin</span>
      </button>
      <button className={style.button_aggregate} value="registrar" onClick={() => {
              navigate('/RegistrerProduct')
              }}>
          <div className="svg_wrapper_1">
              <div className="svg_wrapper">
                  <FaShoppingBasket/>
              </div>
          </div>
          <span>Agregar Producto</span>
      </button>
    </div>
    <br /><br />

    <hr />

    <br /><br />
    <div className="row">
      <div className={`col-2 ${style.buttonAside}`}>
        <button className={style.btnstyle} onClick={handleShowProducts}>Listar productos</button>
      </div>
      <div className="col">
        {showProducts && <GetProducts />}
      </div>
    </div>
    <div className="row">
      <div className={`col-2 ${style.buttonAside}`}>
        <button className={style.btnstyle} onClick={handleShowBooks}>Listar Libros</button>
      </div>
      <div className="col">
        {showBooks && <GetBooks />}
      </div>
    </div>
    </>
  )
}
