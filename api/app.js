import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import passport from './Auth/passport.js';
import { validatePermissions } from './Auth/permissions.js';
import appLogin from './routers/login.js';
import appProduct from './routers/product.js';
import appUser from './routers/user.js';
import appAdmin from './routers/admin.js';


dotenv.config()

const appExpress = express();

appExpress.use(express.json());


const corsOptions = {
    origin: '*',
    methods: 'GET,PUT,POST,DELETE',
    optionsSuccessStatus: 204
};
appExpress.use(cors(corsOptions));

appExpress.use('/login', appLogin);
appExpress.use('/Product', passport.authenticate('bearer', { session: false }),validatePermissions, appProduct);
appExpress.use('/User', passport.authenticate('bearer', { session: false }),validatePermissions, appUser);
appExpress.use('/Admin', passport.authenticate('bearer', { session: false }),validatePermissions, appAdmin);





let config = JSON.parse(process.env.MY_SERVER);
appExpress.listen(config, () =>{
    console.log(`listening on http://${config.hostname}:${config.port}`);
})