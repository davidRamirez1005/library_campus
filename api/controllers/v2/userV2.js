import { validationResult } from 'express-validator';
import siguienteId from '../../helpers/autoIncrementId.js'
import {validationUser} from '../../validator/validation.js'
import genCollection from '../../helpers/db.js';

/**
 * * agregar un nuevo usuario
 */
export const aggregateNewUser = async(req, res) =>{
    if (!req.rateLimit) return;

    try {
        const newId = await siguienteId("User");

        await Promise.all(validationUser.map(rule => rule.run(req)));

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let coleccion = await genCollection('User')
        
        const newDocument = {
            _id: newId,
            ...req.body,
        };
        let result = await coleccion.insertOne(newDocument);
        res.status(201).send({ status: 201, message: 'documento creado con exito' });
    } catch (error) {
        console.log(error);
        res.status(406).send('no se ha podido crear el documento');
    }
}

