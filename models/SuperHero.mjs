import mongoose from "mongoose";
const {collection} = mongoose;

const superheroSchema = new mongoose.Schema({
    nombreSuperHeroe: {type: String, require: true},
    nombreReal: {type: String, require: true}, 
    edad: {type: Number, min: 0}, 
    planetaOrigen: {type: String, default: 'Desconocido'}, 
    debilidad: String, 
    poderes: [String], 
    aliados: [String], 
    enemigos: [String],
    creator: {type: String, require: true, default: 'LFA'}, 
    createAt: {type: Date, default: Date.now} 

},{collection: 'Grupo-12'});

export default mongoose.model('SuperHero', superheroSchema);