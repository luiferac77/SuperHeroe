import SuperHeroRepository from "../repositories/SuperHeroRepository.mjs";

export const obtenerSuperHeroePorId = async (id) => {
    return await SuperHeroRepository.obtenerPorId(id);
}

export const obtenerTodosLosSuperHeroes = async () => {
    return await SuperHeroRepository.obtenerTodos();
}

export const buscarHeroesPorAtributo = async (atributo, valor) => {
    return await SuperHeroRepository.buscarPorAtributo(atributo, valor);
}

export const obtenerSuperHeroesMayoresDe30 = async () => {
    return await SuperHeroRepository.obtenerMayoresDe30();
}

export const nuevoSuperHero = async (datosSuperHero) => {
    return await SuperHeroRepository.nuevoSuperHero(datosSuperHero);
}

export const actualizarSuperHero = async (id, datosActualizados) => {
    return await SuperHeroRepository.actualizarSuperHero(id, datosActualizados);
}

export const eliminarSuperHero = async (id) => {
    return await SuperHeroRepository.eliminarSuperHero(id);
}

export const eliminarSuperHeroPorNombre = async (nombreReal) => {
    return await SuperHeroRepository.eliminarSuperHeroPorNombre(nombreReal);
}