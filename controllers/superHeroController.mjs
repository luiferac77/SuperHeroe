//import SuperHero from "../models/SuperHero.mjs";
import { 
            obtenerSuperHeroePorId, 
            obtenerTodosLosSuperHeroes, 
            buscarHeroesPorAtributo, 
            obtenerSuperHeroesMayoresDe30, 
            nuevoSuperHero, 
            actualizarSuperHero, 
            eliminarSuperHero, 
            eliminarSuperHeroPorNombre
        } from "../services/superHeroService.mjs";

import { 
            renderizarSuperHeroe, 
            renderizarListaSuperHeroes, 
            renderizarMensajeDeOperacion 
        } from "../views/responseView.mjs";

import { navBarLinks } from "../config/navbarLinks.mjs";
//import { validationResult } from "express-validator";

export const obtenerSuperHeroePorIdController = async (req, res) => {

    const {id} = req.params;
    const superheroe = await obtenerSuperHeroePorId(id);

    if(superheroe){
        res.send(renderizarSuperHeroe(superheroe));
    } else {
        res.status(404).send({mensaje: "superheroe no encontrado"});
    }
};

export const renderizarQuinesSomosController = async (req, res) => {
    res.render(
        'quienessomoslayout', 
        {
            layout: 'layout',
            navbarLinks: navBarLinks,
            title: 'Quienes somos', 
            message: req.query.message || '', 
        }   
    );
};

export const renderizarInicioController = async (req, res) => {
    res.render(
        'indexlayout', 
        {
            layout: 'layout',
            navbarLinks: navBarLinks,
            title: 'Inicio', 
            message: req.query.message || '', 
        }   
    );
};

export const renderizarTodosLosSuperHeroesController = async (req, res) => {
    try {
        const superheroes = await obtenerTodosLosSuperHeroes();
        if(superheroes && superheroes.length > 0){
            //console.log(superheroes);
            res.render(
                'dashboard', 
                {
                    layout: 'layout',
                    navbarLinks: navBarLinks,
                    title: 'Todos los superheroes',
                    message: req.query.message || '', 
                    superheroes
                });
            //res.send(renderizarListaSuperHeroes(superheroes));
        } else {
            res.render(
                'dashboard', 
                {
                    title: 'Todos los superheroes',  
                    message: req.query.message || '',
                    superheroes: []
                }
            );
            //res.status(404).send({mensaje: "Superheroes no encontrados"});
        }
    } catch (error) {
        res.status(500).send({mensaje: 'Error al obtener todos los superhéroes', error: error.message});
    }
};

export const buscarHeroesPorAtributoController = async (req, res) => {
    //si quiero usar req.params la ruta en postman será por ejemplo
    //http://localhost:3000/api/heroes/buscar/nombreReal/Peter%20Parker

    //si quiero usar req.query la ruta de postman será por ejemplo 
    //http://localhost:3000/api/heroes/buscar?atributo=nombreReal&valor=Peter%20Parker

    const {atributo, valor} = req.params; //esto es para params
    //const {atributo, valor} = req.query; //esto es para query params
    const superheroes = await buscarHeroesPorAtributo(atributo, valor);

    if(superheroes.length > 0) {
        res.send(renderizarListaSuperHeroes(superheroes));
    } else {
        res.status(404).send({mensaje: "no se encontraron superheroes con ese atributo"});
    }
};

export const obtenerMayoresDe30Controller = async (req, res) => {
    const superheroes = await obtenerSuperHeroesMayoresDe30();
    if(superheroes){
        res.send(renderizarListaSuperHeroes(superheroes));
    } else {
        res.status(404).send({mensaje: "superheros no encontrados"});
    }
};

export const renderizarAddSuperheroController = (req, res) => {
    //res.render('addsuperhero', {title: 'Agregar superhéroe'});

    res.render(
        'addSuperhero', 
        {
            layout: 'layout',
            title: 'Agregar superheroe', 
            navbarLinks: navBarLinks,
            errors: [], 
            message: req.query.message || ''
        });
}

export const renderizarEditSuperheroController = async (req, res) => {
    
    try {

        const { id } = req.params;
        const superheroe = await obtenerSuperHeroePorId(id);
        if(!superheroe){
            return res.status(404).render('error', {
                title: 'Error', 
                message: 'Superhéroe no encontrado'
            });
        }

        superheroe.poderes = Array.isArray(superheroe.poderes) ? superheroe.poderes : [];

        console.log(superheroe);
        res.render('editSuperhero', {
            layout: 'layout',
            title: 'Editar superhéroe', 
            navbarLinks: navBarLinks,
            superheroe, 
            errors: [],
            oldInputs: superheroe 
        });

    } catch (error) {
        res.status(500).render('error', {
            title: 'Error', 
            message: 'Ocurrió un error al cargar la vista de edición', 
            error: error.message
        });
    }

};

export const renderizarDeleteSuperHeroController = async (req, res) => {
    const { id } = req.params;
    try {
        const superheroe = await obtenerSuperHeroePorId(id);
        if(superheroe){
            res.render('eliminarSuperhero', {
            layout: 'layout', 
            title: 'Desea eliminar el superhéroe?', 
            navbarLinks: navBarLinks,
            superheroe
            }); 
        } else {
            res.status(404).send({mensaje: 'Superhéroe no encontrado'});
        }
    } catch (error) {
        res.status(500).send({mensaje: 'no se pudo encontrar el super héroe'});
        console.error('No se pudo encontrar el superhéroe', error);
    }
};
export const nuevoSuperHeroController = async (req, res) => {

    try {
        
        const {nombreSuperHeroe, nombreReal, edad, planetaOrigen} = req.body;
        
        //const poderes = Array.isArray(req.body.poderes) ? req.body.poderes : [req.body.poderes];
        let poderes = req.body.poderes; 
        if (poderes) {
            poderes = poderes.split(',').map(poder => poder.trim());
        }
        
        const datosSuperHero = {
            nombreSuperHeroe, nombreReal, edad: parseInt(edad), planetaOrigen, poderes
        };
        console.log(datosSuperHero);
        const superHero = await nuevoSuperHero(datosSuperHero);

        if(superHero){
            //res.send(renderizarSuperHeroe(superHero));
            res.redirect('/api/heroes/dashboard');
        } else {
            res.status(400).send({mensaje: "No se puedo insertar el superhéroe", error: error.message});    
        }
        
    } catch (error) {
        res.status(400).send({mensaje: "error al insetar el nuevo superhéroe", error: error.message});     
    }
};

export const actualizarSuperHeroController = async (req, res) => {
    const { id } = req.params;
    const { nombreSuperHeroe, nombreReal, edad, planetaOrigen } = req.body;
    const poderes = Array.isArray(req.body.poderes) ? req.body.poderes : [req.body.poderes];
    const datosActualizados = {
        nombreSuperHeroe, 
        nombreReal, 
        edad: parseInt(edad), 
        planetaOrigen, 
        poderes
    }
    const superheroe = await actualizarSuperHero(id, datosActualizados);
    if(superheroe){
        //console.log(superheroe);
        const superheroes = await obtenerTodosLosSuperHeroes();
        res.redirect('/api/heroes/dashboard');
        //res.send(renderizarSuperHeroe(superheroe));
    } else {
        //res.status(404).send({mensaje: "error al actualizar el super heroe"});
        res.redirect('/api/heroes/dashboard');
    }
};

export const eliminarSuperHeroController = async (req, res) => {
    const { id } = req.params;
    try {
            const resultado = await eliminarSuperHero(id);
            if (resultado){
                //const superheroes = await obtenerTodosLosSuperHeroes;
                //res.send(renderizarMensajeDeOperacion("El superheroe ha sido eliminado", renderizarSuperHeroe(superHeroe)));
                /*res.render(
                    'dashboard', {
                        title: 'Todos los superhéroes', 
                        message: 'El superhéroe fue eliminado con éxito', 
                        superheroes
                    }
                );*/
                //res.redirect('/api/heroes/dashboard?message=Superhéroe eliminado exitosamente');
                //req.session.message = 'Superhéro eliminado'
                res.redirect('/api/heroes/dashboard');
            } else {
                //res.redirect('/api/heroes/dashboard?message=Error: Superhéroe no encontrado');
                //res.status(404).send({mensaje: 'No e puedo eliminar el superhéroe'});
                //req.session.message = 'Error: Superhéroe no encontrado';
                res.redirect('/api/heroes/dashboard');
            }
    } catch (error) {
        console.error('Error en el servidor al intentar eliminar el superhéroe', error);
        //req.session.message = 'Error al intentar eliminar el superhéroe';
        res.redirect('/api/heroes/dashboard');
        //res.redirect('/api/heroes/dashboard?message=Error al eliminar superhéroe');
        //res.status(500).send({mensaje: 'Error en el servidor al intentar eliminar el superhéroe'});
    }
};

export const eliminarSuperHeroPorNombreController = async (req, res) => {
    const { nombreReal } = req.params;
    console.log(nombreReal);
    const resultado = await eliminarSuperHeroPorNombre(nombreReal);
    if(resultado){
        res.send(renderizarMensajeDeOperacion("El superheroe ha sido eliminado", renderizarSuperHeroe(resultado)));
    } else {
        res.status(404).send(renderizarMensajeDeOperacion("Superheroe no encontrado"));
    }
};