import genCollection from '../../helpers/db.js';

/**
 * * listar todos los users
 */
export const getUsers = async(req, res) =>{
    if(!req.rateLimit) return;

    let coleccion = await genCollection('User')
    let result = await coleccion.find().project({
        rol : 0
    }).toArray();
    (result) ? res.send(result) : res.status(404).send({"status": 404, "message": `error en la consulta`});
}

/**
 * * listar user por medio del la cedula
 */
export const getUserByIdentification = async (req, res) => {
    if (!req.rateLimit) return;

    const identification2 = req.params.identification;
    console.log(identification2);
    const coleccion = await genCollection('User');

    try {
        const cursor = await coleccion.find({
        identification: identification2,
        });

        const result = await cursor.next();

        (result) ? res.send(result) : res.status(404).send({"status": 404, "message": `error en la consulta`});
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: 500, message: 'Error al buscar el usuario' });
    }
};