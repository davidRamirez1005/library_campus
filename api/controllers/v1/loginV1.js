import {Router} from 'express'
import { rateLimit } from 'express-rate-limit';
import {limitLogin} from '../../config/configLimit.js'
import {generateToken} from '../../Auth/token.js'

const loginV1 = Router();

loginV1.use(limitLogin(), generateToken);

loginV1.use(
    (req,res, next) => {
        if(!req.rateLimit) return;
        if (!errors.isEmpty()) return res.status(400).json(errors);
    }
)

export {loginV1}