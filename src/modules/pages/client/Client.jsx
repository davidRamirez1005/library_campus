import React, { useState } from 'react';
import { useAuth } from '../../auth/context/auth';
import { Menu } from '@/shared/Menu';
import styleContext from '../../auth/assets/css/registrer.module.css'
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ProductionQuantityLimitsSharpIcon from '@mui/icons-material/ProductionQuantityLimitsSharp';
import HistoryBorrowedUser from './components/HistoryBorrowedUser';
import ProductFavorite from '../superAdmin/components/ProductFavorite';
import GetProductsUser from './components/GetProductsUser';


export default function Client() {

    const auth = useAuth();

    const [activeComponentTwo, setActiveComponentTwo] = useState('favorite');
    const [value, setValue] = useState(1);
    
    const handleShowProducts = () => {
        setActiveComponentTwo('products');
    };
    const handleShowHistory = () => {
        setActiveComponentTwo('history');
    };
    const handleShowFavorite = () => {
        setActiveComponentTwo('favorite');
    };

return (
    <>
        <Menu />
        <br /><br /><br />

        <div className={styleContext.title_2}><span>Perfil Camper</ span></  div>
        <br />
        <div className={styleContext.form_title}><span>Hola, {auth.user.username} 🚀</span></div>
        <br /><br />
        <hr />
        <br />
        <div className="row">
            <Box sx={{ width: "100%" }}>
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
        <br /><br />
        {activeComponentTwo === 'history' && 
        <div>
            <HistoryBorrowedUser />
        </div>
        }
        {activeComponentTwo === 'products' && <GetProductsUser />}
        {activeComponentTwo === 'favorite' && <ProductFavorite />}
        <br /><br />


    </>
    )
}
