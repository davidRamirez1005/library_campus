import React, { useState, useEffect } from 'react';
import { useAuth } from '../../auth/context/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
import GetUsers from './components/GetUsers';
import ProductFavorite from './components/ProductFavorite';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ProductionQuantityLimitsSharpIcon from '@mui/icons-material/ProductionQuantityLimitsSharp';

let backendUrl = `${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}`;

export default function SuperAdmin() {
  const navigate = useNavigate();
  const auth = useAuth();

  const [activeComponent, setActiveComponent] = useState(null);
  const [activeComponentTwo, setActiveComponentTwo] = useState('favorite');
  const [value, setValue] = useState(1);
  let [users, setUsers] = useState([]);
  const [valueTab, setValueTab] = useState(0);

  const handleChange = (event, newValue) => {
    setValueTab(newValue);
  };

  let bearerAuth = auth.user.bearer

  const handleShowProducts = () => {
    setActiveComponentTwo('products');
  };
  const handleShowHistory = () => {
    setActiveComponentTwo('history');
  };
  const handleShowFavorite = () => {
    setActiveComponentTwo('favorite');
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

  const contar = async () => {
    try {
    const response = await axios.get(`http://${backendUrl}/User/listar/user`, {
        headers: {
        'Content-Type': 'application/json',
        'Accept-Version': '1.2.0',
        'Authorization': `Bearer ${bearerAuth}`,
        },
    });
    if (response.status != 200) {
        throw new Error('Error en la solicitud');
    }
    const productsData = response.data;
    setUsers(productsData);
    } catch (error) {
        return alert('error en la consulta para contar los usuarios');
    } finally {
    }
};
  useEffect(() => {
    contar();
  }, []);
  return (
    <>
    <Menu />
    <br /><br /><br /><br />

    <div>
    <div className={styleContext.title_2}><span>ADMINISTRACIÓN</span></div>
    <br />
    <div className={styleContext.form_title}><span>Hola, {auth.user.name} 🚀</span></div>
    <br /><br />
    <hr />
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
    <div className="row" >
      <Box sx={{ width: "100%",  marginBottom : "2rem"}}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction onClick={handleShowHistory} label="Historial Usuario" icon={<RestoreIcon />} />
          <BottomNavigationAction onClick={handleShowFavorite} label="Favorito" icon={<FavoriteIcon />} />
          <BottomNavigationAction onClick={handleShowProducts} label="Productos" icon={<ProductionQuantityLimitsSharpIcon />} />
        </BottomNavigation>
      </Box>
    </div>
    {activeComponentTwo === 'history' && <GetHistoryUser />}
    {activeComponentTwo === 'products' && <GetProducts />}
    {activeComponentTwo === 'favorite' && <ProductFavorite />}
    <Box sx={{ width: "100%", bgcolor: '#144272', color : "#B1D0E0", display : "flex", justifyContent : "center", marginTop : "2rem" }}>
      <Tabs
        value={valueTab}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
      >
        <Tab style={{color : "white"}} label=" Listar libros" onClick={handleShowBooks} />
        <Tab style={{color : "white"}} label="libros prestados" onClick={handleShowBorrowed} />
        <Tab style={{color : "white"}} label="libros entregados" onClick={handleShowDelivered} />
        <Tab style={{color : "white"}} label="libros reservados" onClick={handleShowReserved} />
      </Tabs>
    </Box>
    <div className="row">
      <br /><br />
        {activeComponent === 'books' && <GetBooks />}
        {activeComponent === 'borrowed' && <GetBorrowed />}
        {activeComponent === 'delivered' && <GetBooksDelivered />}
        {activeComponent === 'reserved' && <GetBookReserved />}
    </div>
    <br /><br />
    <div className="row">
      <div className={style.containerUsers}>
      <h2>Usuarios registrados: <span>{users.count}</span></h2> 
      <div>
      <GetUsers />
      </div>
      </div>
    </div>
      <br /><br /><br />
    </>
  )
}
