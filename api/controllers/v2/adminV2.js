import { validationResult } from 'express-validator';
import siguienteId from '../../helpers/autoIncrementId.js'
import {validationAdmin} from '../../validator/validation.js'
import genCollection from '../../helpers/db.js';


/**
 * * agregar un nuevo Admin
 */
export const aggregateNewAdmin = async(req, res) =>{
    if (!req.rateLimit) return;

    try {
        const newId = await siguienteId( "Admin");

        await Promise.all(validationAdmin.map(rule => rule.run(req)));

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let coleccion = await genCollection('Admin')
        
        const newDocument = {
            _id: newId,
            ...req.body,
        };
        let result = await coleccion.insertOne(newDocument);
        res.status(201).send({ status: 201, message: 'documento creado con exito', "documento" : newDocument});
    } catch (error) {
        console.log(error);
        res.status(406).send('no se ha podido crear el documento');
    }
}

/**
 * * eliminar un administrador
 */
export const deleteAdmin = async (req, res) => {
    if (!req.rateLimit) return;

    const identification = req.params.identification;

    try {
        let coleccion = await genCollection('Admin');

        const admin = await coleccion.findOneAndDelete({ identification: identification });

        if (admin) {
            res.send('Administrador eliminado con éxito');
        } else {
            res.send('Administrador no eliminado');
        }
    } catch (err) {
        console.error(err);

        console.error('Error al eliminar el administrador:', err.message);
        console.error('Filtro utilizado:', { identification: identification });

        res.status(500).send('Error al eliminar el administrador de la base de datos.');
    }
}