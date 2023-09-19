import {con} from '../config/atlas.js'


export default async function siguienteId(coleccionName) {
    let db = await con();
    let countersCollection = db.collection('counters');

    const sequenceDocument = await countersCollection.findOneAndUpdate(
        { _id: `${coleccionName}Id` },
        { $inc: { sequence_value: 1 } },
        { returnDocument: "after" }
    );

    return sequenceDocument.sequence_value;
}