export const renderizarSuperHeroe = (superheroe) => {
    return {
        Nombre: superheroe.nombreSuperHeroe,
        "Nombre Real": superheroe.nombreReal, 
        Edad: superheroe.edad, 
        Debilidad: superheroe.debilidad, 
        Poderes: superheroe.poderes, 
        Aliados: superheroe.aliados, 
        Enemigos: superheroe.enemigos
    }
}

export const renderizarListaSuperHeroes = (superheroes) => {
    return superheroes.map(superheroe => renderizarSuperHeroe(superheroe));
}

export const renderizarMensajeDeOperacion = (mensaje, detalle = null) => {
    return {
        mensaje, 
        detalle
    }
}