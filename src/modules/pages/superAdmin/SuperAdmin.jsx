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
import GetBorrowed from './components/GetBorrowed';
import GetHistoryUser from './components/GetHistoryUser';
import GetBooksDelivered from './components/GetBooksDelivered';
import GetBookReserved from './components/GetBookReserved';
// import PutProductStatus from './components/PutProductStatus';

export default function SuperAdmin() {
  const navigate = useNavigate();
  const auth = useAuth();

  const [showGetHistory, setShowGetHistory] = useState(false);
  const [activeComponent, setActiveComponent] = useState(null);

  const handleShowProducts = () => {
    setActiveComponent('products');
  };
  
  const handleShowBooks = () => {
    setActiveComponent('books');
  };

  const handleShowBorrowed = () => {
    setActiveComponent('borrowed');
  };

  const handleShowDelivered = () => {
    setActiveComponent('delivered');
  };

  const handleShowReserved = () => {
    setActiveComponent('reserved');
  };

  const handleShowGetHistory = () => {
    setShowGetHistory(!showGetHistory);
  };

  return (
    <>
    <Menu />
    <br /><br /><br /><br />

    <div>
    <div className={styleContext.title_2}><span>ADMINISTRACIÓN</span></div>
    <br />
    <div className={styleContext.form_title}><span>Hola, {auth.user.name} 🚀</span></div>
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
    </div>

    <hr />

          {/* <PutProductStatus /> */}
    <br /><br />
    <div className="row">
      <div className="col">
          <button className={style.btnstyle} onClick={handleShowGetHistory} style={{marginLeft :"2rem"}}>Historal usuario</button> 
          <br />
          {showGetHistory && <GetHistoryUser />}

          

        <br /><br />
      </div>
    </div>
    <div className={`row ${style.sectionNav}`}>
      <div className={`col ${style.divButton}`}>
        <button className={style.btnstyle} onClick={handleShowProducts}>Listar productos</button>
      </div>
      <div className={`col ${style.divButton}`}>
      <button className={style.btnstyle} onClick={handleShowBooks}>Libros</button>
      </div>
      <div className={`col ${style.divButton}`}>
      <button className={style.btnstyle} onClick={handleShowBorrowed}>Libros prestados</button>
      </div>
      <div className={`col ${style.divButton}`}>
        <button className={style.btnstyle} onClick={handleShowDelivered}>Libros entregados</button> 
      </div>
      <div className={`col ${style.divButton}`}>
        <button className={style.btnstyle} onClick={handleShowReserved}>Libros reservados</button> 
      </div>
    </div>
    <div className="row">
        {activeComponent === 'products' && <GetProducts />}
        {activeComponent === 'books' && <GetBooks />}
        {activeComponent === 'borrowed' && <GetBorrowed />}
        {activeComponent === 'delivered' && <GetBooksDelivered />}
        {activeComponent === 'reserved' && <GetBookReserved />}
    </div>
    </>
  )
}
