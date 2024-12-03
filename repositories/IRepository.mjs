class IRepository {
    obtenerPorId(id){
        throw new Error("Método 'obtenerId()' no implementado");
    }
    obtenerTodos(){
        throw new Error("Método 'obtenerTodos()' no implementado");
    }

    buscarPorAtributo(atributo, valor){
        throw new Error("Método 'buscarPorAtributo()' no implementado");
    }

    obtenerMayoresDe30(){
        throw new Error("Método 'obtenerMayoresDe38()' no implementado");
    }

    nuevoSuperHero(datosSuperHero){
        throw new Error("Método 'nuevoSuprHero(datosSuperHero)' no implementado");
    }

    actualizarSuperHero(id, datosActualizados){
        throw new Error("Método 'actualizarsuperHero(id, datosActualizados)' no implementado");
    }

    eliminarSuperHero(id){
        throw new Error("Método 'eliminarSuperHero(id)' no implementado");
    }
    
    eliminarSuperHeroPorNombre(nombreReal){
        throw new Error("Método 'eliminarSuperHeroPorNombre(nombreReal)' no implementado");
    }
}

export default IRepository;