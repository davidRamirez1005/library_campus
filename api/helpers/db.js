import  {con}  from '../config/atlas.js';

const genCollection = async (coleccion) => {
    try {
        let db = await con();
        let newCollection = db.collection(coleccion)
        return newCollection;
        
    } catch (error) {
        console.log(error);
    }
}

export default genCollection