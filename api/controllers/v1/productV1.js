import genCollection from '../../helpers/db.js';
import { findAvailable, findAvaliableBooks, findBorrowed, findProductCloseDate, findBooksDelivered, findBooksReserved, aggregateProduct, findIdUser, productFavorite, userHistoryCompleted } from '../../data/querys.js'


/**
 * * encontrar los productos que esten disponibles
 */
export const getProductAvailable = async(req, res) =>{
    if(!req.rateLimit) return;

    let coleccion = await genCollection('Product')
    let result = await coleccion.aggregate(findAvailable).toArray();
    (result) ? res.send(result) : res.status(404).send({"status": 404, "message": `error en la consulta`});
}
/**
 * * encontrar los productos que esten disponibles de la categoria libros
 */
export const getAvaliableBooks = async(req, res) =>{
    if(!req.rateLimit) return;

    let coleccion = await genCollection('Product')
    let result = await coleccion.aggregate(findAvaliableBooks).toArray();
    (result) ? res.send(result) : res.status(404).send({"status": 404, "message": `error en la consulta`});
}
/**
 * * encontrar los productos que esten prestados con la informacion del usuario
 */
export const getBorrowed = async(req, res) =>{
    if(!req.rateLimit) return;

    let coleccion = await genCollection('Product')
    let result = await coleccion.aggregate(findBorrowed).toArray();
    (result) ? res.send(result) : res.status(404).send({"status": 404, "message": `error en la consulta`});
    console.log(...result)
  }
/**
 * * listar el historial de productos prestados por un usuario en especifico de la fecha mas reciente hacia atras
 */
export const getHistoryUser = async (req, res) => {
    if (!req.rateLimit) return;
    const user_id2 = req.params.user_id2;

    if (!user_id2) {
      return res.status(400).send('El ID del usuario no es válido');
    }
    
    const coleccion = await genCollection("Product");
    const coleccionUser = await genCollection("User");
    
    const cursor = await coleccionUser.aggregate([...findIdUser(user_id2)]);
    const users = await cursor.toArray();

    if (users.length === 0) {
      return res.status(404).send({ status: 404, message: "Usuario no encontrado" });
    }
    
    const userIdentification = users[0]._id;
    const cursor2 = await coleccion.aggregate([...aggregateProduct(userIdentification)]);
    
    const results = await cursor2.toArray();
    
    if (results.length > 0) {
      res.send(results);
    } else {
      res.status(404).send({ status: 404, message: "Usuario no encontrado" });
    }
  };
/**
 * * encontrar los productos con final_date mas cercanos a la fecha actual con la informacion del user
 */
export const getProductCloseDate = async(req, res) =>{
    if(!req.rateLimit) return;

    let coleccion = await genCollection('Product')
    let result = await coleccion.aggregate(findProductCloseDate).toArray();
    (result) ? res.send(result) : res.status(404).send({"status": 404, "message": `error en la consulta`});
}
/**
 * * encontrar los productos que estan proximos a entregar en los siguientes 3 dias
 */
export const getProductsNextDate = async(req, res) =>{
    if(!req.rateLimit) return;

    let coleccion = await genCollection('Product')
    let result = await coleccion.aggregate(findProductCloseDateNext).toArray();
    (result) ? res.send(result) : res.status(404).send({"status": 404, "message": `error en la consulta`});
}
/**
 * * listar los productos libros con status entregado
 */
export const getBooksDelivered = async(req, res) =>{
    if(!req.rateLimit) return;

    let coleccion = await genCollection('Product')
    let result = await coleccion.aggregate(findBooksDelivered).toArray();
    (result) ? res.send(result) : res.status(404).send({"status": 404, "message": `error en la consulta`});
}
/**
 * * listar los productos libros con status reservado
 */
export const getBooksReserved = async(req, res) =>{
    if(!req.rateLimit) return;

    let coleccion = await genCollection('Product')
    let result = await coleccion.aggregate(findBooksReserved).toArray();
    (result) ? res.send(result) : res.status(404).send({"status": 404, "message": `error en la consulta`});
}
/**
 * * obtener historial de un usuario en especifico por medio de la identificacion
 */
export const historyUser = async(req, res) =>{
    if(!req.rateLimit) return;
    const id_user = req.params.id_user

    let coleccion = await genCollection('History')
    let result = await coleccion.aggregate(userHistoryCompleted(id_user)).toArray();
    (result) ? res.send(result) : res.status(404).send({"status": 404, "message": `error en la consulta`});
}
/**
 * * obtener el producto mas prestado
 */
export const favoriteProduct = async(req, res) =>{
    if(!req.rateLimit) return;

    let coleccion = await genCollection('History')
    let result = await coleccion.aggregate(productFavorite).toArray();
    (result) ? res.send(result) : res.status(404).send({"status": 404, "message": `error en la consulta`});
}

