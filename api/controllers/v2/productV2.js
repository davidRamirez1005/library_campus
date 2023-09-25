// import {ObjectId} from 'mongodb'
import { validationResult } from 'express-validator';
import siguienteId from '../../helpers/autoIncrementId.js'
import {validationProduct} from '../../validator/validation.js'
import genCollection from '../../helpers/db.js';
/**
 * * insertar un nuevo producto
 */
export const aggregateNewProduct = async(req, res) =>{
    if (!req.rateLimit) return;

    try {
        let newId = await siguienteId("Product");

        await Promise.all(validationProduct.map(rule => rule.run(req)));

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let coleccion = await genCollection('Product')
        
        const newDocument = {
            _id: newId,
            ...req.body,
        };
        let result = await coleccion.insertOne(newDocument);
        res.status(201).send({ status: 201, message: 'documento creado con exito', "documento" : newDocument });
    } catch (error) {
        console.log(error);
        res.status(406).send('no se ha podido crear el documento');
    }
}
/**
 * * actualizar un status de producto de prestado a entregado por medio del id
 */
export const updateStatusDelivery = async (req, res) => {
    if (!req.rateLimit) return;

    let product_id = Number(req.params.product_id);

    try {
        let coleccion = await genCollection('Product');

        let filter = { _id: product_id };
        let update = { $set: { status: "entregado" } };

        let result = await coleccion.updateOne(filter, update);

        if (result.modifiedCount === 1) {
            res.send('Estado del producto actualizado con éxito');
        } else {
            res.send('Estado del producto no actualizado');
        }
    } catch (err) {
        console.error(err);

        console.error('Error al actualizar el estado del producto:', err.message);

        res.status(500).send('Error al actualizar el estado del producto en la base de datos.');
    }
}
/**
 * * actualizar un status de producto de disponible a agotado por medio del _id
 */
export const updateStatusSpend = async (req, res) => {
    if (!req.rateLimit) return;

    const product_id2 = Number(req.params.product_id);

    try {
        let coleccion = await genCollection('Product');

        const filter = { _id: product_id2 };
        const update = { $set: { status: "agotado" } };

        const result = await coleccion.updateOne(filter, update);

        if (result.modifiedCount === 1) {
            res.send('Estado del producto actualizado con éxito');
        } else {
            res.send('Estado del producto no actualizado');
        }
    } catch (err) {
        console.error(err);

        console.error('Error al actualizar el estado del producto:', err.message);
        console.error('Filtro utilizado:', filter);
        console.error('Actualización utilizada:', update);

        res.status(500).send('Error al actualizar el estado del producto en la base de datos.');
    }
}
