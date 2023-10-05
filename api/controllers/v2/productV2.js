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
        // console.log(error);
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
            res.status(202).send('Estado del producto actualizado con éxito');
        } else {
            res.send('Estado del producto no actualizado');
        }
    } catch (err) {
        // console.error(err);

        // console.error('Error al actualizar el estado del producto:', err.message);

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
            res.status(202).send('Estado del producto actualizado con éxito');
        } else {
            res.send('Estado del producto no actualizado');
        }
    } catch (err) {
        // console.error(err);

        // console.error('Error al actualizar el estado del producto:', err.message);
        // console.error('Filtro utilizado:', filter);
        // console.error('Actualización utilizada:', update);

        res.status(500).send('Error al actualizar el estado del producto en la base de datos.');
    }
}
/**
 * * actualizar un status de producto de entregado a disponible por medio del _id
 */
export const updateStatusAvailable = async (req, res) => {
    if (!req.rateLimit) return;

    const product_id3 = Number(req.params.product_id);

    try {
        let coleccion = await genCollection('Product');

        const filter = { _id: product_id3 };
        const update = { $set: { status: "disponible" } };

        const result = await coleccion.updateOne(filter, update);

        if (result.modifiedCount === 1) {
            res.status(202).send('Estado del producto actualizado con éxito');
        } else {
            res.send('Estado del producto no actualizado');
        }
    } catch (err) {
        // console.error(err);

        // console.error('Error al actualizar el estado del producto:', err.message);
        // console.error('Filtro utilizado:', filter);
        // console.error('Actualización utilizada:', update);

        res.status(500).send('Error al actualizar el estado del producto en la base de datos.');
    }
}
/**
 * * actualizar un status de producto a prestado por medio del _id
 */
export const updateStatusBorrowed = async (req, res) => {
    if (!req.rateLimit) return;

    const product_id3 = Number(req.params.product_id);

    try {
        let coleccion = await genCollection('Product');

        const filter = { _id: product_id3 };
        const update = { $set: { status: "prestado" } };

        const result = await coleccion.updateOne(filter, update);

        if (result.modifiedCount === 1) {
            res.status(202).send('Estado del producto actualizado con éxito');
        } else {
            res.send('Estado del producto no actualizado');
        }
    } catch (err) {
        // console.error(err);

        // console.error('Error al actualizar el estado del producto:', err.message);

        res.status(500).send('Error al actualizar el estado del producto en la base de datos.');
    }
}
/**
 * * actualizar un libro a prestado con los datos del usuario
 */
export const updateBookUser = async (req, res) => {
    if (!req.rateLimit) return;

    const product_id3 = Number(req.params.product_id);

    try {
        let coleccion = await genCollection('Product');

        const identification2 = req.params.identification;
        const userCollection = await genCollection('User');

        const userDoc = await userCollection.findOne({ identification: identification2 });

        if (!userDoc) {
            res.status(404).send('Usuario no encontrado');
            return;
        }

        const filter = { _id: product_id3 };
        const update = {
            $set: {
                status: "prestado",
                start_date: req.body.start_date,
                final_date: req.body.final_date,
                user_identification: userDoc._id
            }
        };
        // Valida que la fecha final sea mayor a la fecha inicial
        if (req.body.final_date <= req.body.start_date) {
            return res.status(400).send('La fecha final debe ser mayor a la fecha inicial');
        }

        // Valida que la fecha final no supere 5 días
        const delta = req.body.final_date - req.body.start_date;
        if (delta.days > 5) {
            return res.status(400).send('La reserva no puede ser mayor a 5 días');
        }
        const result = await coleccion.updateOne(filter, update);

        if (result.modifiedCount === 1) {
            res.status(202).send({ status: 202, message: 'Estado del producto actualizado con éxito' });
        } else {
            res.send('Estado del producto no actualizado');
        }
    } catch (err) {
        // console.error('Error al actualizar el estado del producto:', err.message);
        res.status(500).send('Error al actualizar el estado del producto en la base de datos.');
    }
}

/**
 * * actualizar un libro a reservado con los datos del usuario
 */
export const updateBookUserReserved = async (req, res) => {
    if (!req.rateLimit) return;

    const product_id4 = Number(req.params.product_id);

    try {
        let coleccion = await genCollection('Product');

        const identification2 = req.params.identification;
        const userCollection = await genCollection('User');

        const userDoc = await userCollection.findOne({ identification: identification2 });

        if (!userDoc) {
            res.status(404).send('Usuario no encontrado');
            return;
        }

        const filter = { _id: product_id4 };
        const update = {
            $set: {
                status: "reservado",
                start_date: req.body.start_date,
                final_date: req.body.final_date,
                user_identification: userDoc._id
            }
        };
        // Valida que la fecha final sea mayor a la fecha inicial
        if (req.body.final_date <= req.body.start_date) {
            return res.status(400).send('La fecha final debe ser mayor a la fecha inicial');
        }

        const deltaInMilliseconds = req.body.final_date - req.body.start_date;
        const deltaInDays = deltaInMilliseconds / (1000 * 60 * 60 * 24);
        
        if (deltaInDays > 5) {
            return res.status(400).send('La reserva no puede ser mayor a 5 días');
        }

        const result = await coleccion.updateOne(filter, update);

        if (result.modifiedCount === 1) {
            res.status(202).send({ status: 202, message: 'Estado del producto actualizado con éxito' });
        } else {
            res.send('Estado del producto no actualizado');
        }
    } catch (err) {
        // console.error('Error al actualizar el estado del producto:', err.message);
        res.status(500).send('Error al actualizar el estado del producto en la base de datos.');
    }
}
/**
 * * eliminar un producto por medio del _id
 */
export const deleteProduct = async (req, res) => {
    if (!req.rateLimit) return;

    const product_id4 = Number(req.params.product_id);

    try {
        let coleccion = await genCollection('Product');

        const filter = { _id: product_id4 };

        const result = await coleccion.deleteOne(filter);

        if (result.deletedCount === 1) {
            res.status(202).send('Producto eliminado con éxito');
        } else {
            res.send('Producto no eliminado');
        }
    } catch (err) {
        // console.error(err);

        // console.error('Error al eliminar el producto:', err.message);
        // console.error('Filtro utilizado:', filter);

        res.status(500).send('Error al eliminar el producto en la base de datos.');
    }
}
/**
 * * insertar un producto a la coleccion history
 */
export const aggregateProductHistory = async(req, res) =>{
    if (!req.rateLimit) return;

    try {
        let newId = await siguienteId("History");

        await Promise.all(validationProduct.map(rule => rule.run(req)));

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let coleccion = await genCollection('History')
        
        const newDocument = {
            _id: newId,
            ...req.body,
        };
        let result = await coleccion.insertOne(newDocument);
        res.status(201).send({ status: 201, message: 'documento creado con exito', "documento" : newDocument });
    } catch (error) {
        // console.log(error);
        res.status(406).send('no se ha podido crear el documento');
    }
}