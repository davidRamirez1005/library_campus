import {limitget} from '../config/configLimit.js'
import Routes from 'express';
import routesVersioning  from 'express-routes-versioning';
import {aggregateNewAdmin, deleteAdmin} from '../controllers/v2/adminV2.js'

const appAdmin = Routes();
const version = routesVersioning();
appAdmin.use(limitget());
//Headers 'Accept-Version: 1.0.0' 


appAdmin.post('/agregar/admin', version({
    "~1.0.0": aggregateNewAdmin
}))
appAdmin.delete('/eliminar/admin/:identification?', version({
    "^1.0.0": deleteAdmin
}))

export default appAdmin;