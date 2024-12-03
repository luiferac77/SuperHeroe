import SuperHero from "../models/SuperHero.mjs";
import IRepository from "./IRepository.mjs";
import mongoose from "mongoose";

class SuperHeroRepository extends IRepository{
    async obtenerPorId(id){
        return await SuperHero.findById(id);
    }

    async obtenerTodos(){
        return await SuperHero.find();
    }

    async buscarPorAtributo(atributo, valor){
        //const query = { [atributo]: new RegExp(valor, 'i')};
        //return await SuperHero.find(query);
        const atributosValidos = ['nombreSuperHeroe', 'nombreReal', 'edad', 'planetaOrigen', 'debilidad', 'poderes', 'aliados', 'enemigos', 'crator', 'createAt', '_id'];

        if (!atributosValidos.includes(atributo)) {//verifica si el atributo no está dentro del array
            throw new Error(`Atributo no válido: ${atributo}`);
        }

        let query;

        //primero verifico si el atributo que se está buscando es un id de mongoDB
        if (atributo === '_id') {
            if (!mongoose.Types.ObjectId.isValid(valor)) {//verifico si el valor es de tipo ObjectId(exadecimal de 24 caracteres) valido de mongo
                throw new Error('ID no válido');
            }
            query = { _id: valor }; // si es valido, especifico el query para buscar el id
        }
        //si no es id, pregunto si el atributo es si y solo si edad
        else if (atributo === 'edad') {
            const numeroValor = Number(valor); //convierto el valor que viene en formato String a número
            if (isNaN(numeroValor)) { //si el valor convertido: No es Un Número, muestro error
                throw new Error('Valor de edad debe ser un número');
            }
            query = { edad: numeroValor }; // si es número, el query queda así
        }
        // si el atributo no es un id y no es edad, cualquier atributo va a ser de tipo Strin 
        //y puedo usar una expresión regular para el valor en el query
        else {
            //La expresión regular permite una coincidencia parcial y sin distinción de mayúsculas/minúsculas 
            //(i significa "case-insensitive"), lo cual es útil para búsquedas de texto.
            query = { [atributo]: new RegExp(valor, 'i') };
        }

        try {
            return await SuperHero.find(query); //busco los documentos con la query válida
        } catch (error) {
            console.error('Error en la búsqueda por atributo:', error);
            throw error;
        }
    }

    async obtenerMayoresDe30(){
        return await SuperHero.find(
            {
                edad: { $gt: 30 },
                planetaOrigen: 'Tierra', 
                //poderes: {$size: {$gte: 2}} 
                //$expr: { $gte: [{ $size: "$poderes" }, 2] }
                //$or: [
                //        { 
                $and: [
                    { poderes: { $exists: true, $type: "array" } }, // Verifica que "poderes" sea un arreglo
                    { $expr: { $gte: [{ $size: "$poderes" }, 2] } } // Condición de tamaño mínimo
                    ]
                //},
                //    { poder: { $exists: true, $type: "string" } } // Verifica que "poder" exista como string
                //]
            }
        );
    }

    async nuevoSuperHero(datosSuperHero){
        const nuevoSuprHero = new SuperHero(datosSuperHero);
        return await nuevoSuprHero.save();
    }

    async actualizarSuperHero(id, datosActualizados){
        return await SuperHero.updateOne(
            {_id: id},
            {$set: datosActualizados}
        );
    }

    async eliminarSuperHero(id){
        return await SuperHero.deleteOne({_id: id});
    }

    async eliminarSuperHeroPorNombre(nombreReal){
        return await SuperHero.findOneAndDelete({nombreReal: new RegExp(nombreReal, 'i') });
    }
}

export default new SuperHeroRepository;