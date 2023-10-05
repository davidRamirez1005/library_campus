import {limitget} from '../config/configLimit.js'
import Routes from 'express';
import routesVersioning  from 'express-routes-versioning';
import {getProductAvailable, getAvaliableBooks, getBorrowed, getHistoryUser, getProductCloseDate, getBooksDelivered, getBooksReserved, historyUser, favoriteProduct, getProductsNextDate} from '../controllers/v1/productV1.js'
import {aggregateNewProduct, updateStatusDelivery, updateStatusSpend, updateStatusAvailable, updateStatusBorrowed, deleteProduct, updateBookUser, updateBookUserReserved, aggregateProductHistory} from '../controllers/v2/productV2.js'

const appProduct = Routes();
const version = routesVersioning();
appProduct.use(limitget());
//Headers 'Accept-Version: 1.0.0' 

appProduct.get('/listar',  version({
    "~1.0.0": getProductAvailable,
    "~1.1.0": getAvaliableBooks
}))
appProduct.get('/listar/prestados/:user_id2?',  version({
    "1.0.1": getBorrowed,
    "1.1.0": getHistoryUser,
    "~1.2.0": getProductCloseDate,
    "~1.3.0": getProductsNextDate
}))
appProduct.get('/listar/entregados',  version({
    "1.0.0": getBooksDelivered,
}))
appProduct.get('/listar/reservados',  version({
    "~1.0.0": getBooksReserved,
}))
/**
 * !history
 */
appProduct.get('/history/:id_user?',  version({
    "~1.0.0": historyUser,
    "~1.1.0": favoriteProduct,
}))

appProduct.post('/agregar/producto', version({
    "~1.0.0": aggregateNewProduct,
    "~1.1.0": aggregateProductHistory 
}))
// appProduct.post('/agregar/admin', version({
//     "~1.2.0": aggregateNewAdmin
// }))

appProduct.put('/actualizar/producto/:product_id?/:identification?', version({
    "~1.0.0": updateStatusDelivery,
    "~1.1.0": updateStatusSpend,
    "~1.2.0": updateStatusAvailable,
    "~1.3.0": updateStatusBorrowed,
    "~1.4.0": updateBookUser,
    "~1.5.0" : updateBookUserReserved
}))

appProduct.delete('/eliminar/producto/:product_id?', version({
    "~1.1.0" : deleteProduct
    
}))


export default appProduct;