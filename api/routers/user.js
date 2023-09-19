import {limitget} from '../config/configLimit.js'
import Routes from 'express';
import routesVersioning  from 'express-routes-versioning';
import {getUsers, getUserByIdentification} from '../controllers/v1/userV1.js'
import {aggregateNewUser} from '../controllers/v2/userV2.js'

const appUser = Routes();
const version = routesVersioning();
appUser.use(limitget());
//Headers 'Accept-Version: 1.0.0' 

appUser.get('/listar/user/:identification?',  version({
    "~1.0.0": getUsers,
    "~1.1.0" : getUserByIdentification
}))
appUser.post('/agregar/user', version({
    "^1.0.0": aggregateNewUser,
}))


export default appUser;