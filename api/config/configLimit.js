import rateLimit from 'express-rate-limit';

let limitget = () => {
    return rateLimit({
        windowMs: 10000,
        max: 4,
        statusCode: 429,
        skip: (req, res)=>{
            if(req.headers["content-length"]>500){
                res.status(413).send({
                    status:413, 
                    message :"la cantidad de caracteres supera el limite."})
                return true
            }
        },
        message: (req,res)=>{
            res.status(429).send({
                status: 429, 
                message: "Has excedido el límite de solicitudes, por favor intenta de nuevo más tarde :("
            });
        },
    });
}
let limitLogin = () => {
    return rateLimit({
        windowMs: 5000,
        max: 1,
        statusCode: 429,
        skip: (req, res)=>{
            if(req.headers["content-length"]>500){
                res.status(413).send({
                    status:413, 
                    message :"la cantidad de caracteres supera el limite."})
                return true
            }
        },
        message: (req,res)=>{
            res.status(429).send({
                status: 429, 
                message: "Has excedido el límite de solicitudes, por favor intenta de nuevo más tarde :("
            });
        },
    });
}
export { limitLogin, limitget }