import express from 'express';
import { validarSuperHeroe } from '../validators/superHeroValidator.mjs';
import { handleValidationErrors } from '../validators/errorMiddleware.mjs';
import { 
            obtenerSuperHeroePorIdController, 
            buscarHeroesPorAtributoController,
            obtenerMayoresDe30Controller, 
            nuevoSuperHeroController, 
            actualizarSuperHeroController, 
            eliminarSuperHeroController, 
            eliminarSuperHeroPorNombreController, 
            renderizarAddSuperheroController, 
            renderizarEditSuperheroController, 
            renderizarDeleteSuperHeroController, 
            renderizarTodosLosSuperHeroesController, 
            renderizarInicioController, 
            renderizarQuinesSomosController
        } from '../controllers/superHeroController.mjs';
//import { obtenerTodosLosSuperHeroes } from '../services/superHeroService.mjs';

const router = express.Router();

const heroAuthMiddleware = (req, res, next) => {
    console.log('Hero Authentication Middleware');
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized');
    }
    next();
};

//router.use(heroAuthMiddleware);

//Orden de las rutas:
//Las más especificas, que son las que pueden contener parámetros deben ir primeras
//por último las de edición, que también están ordenadas 
//desde las más especificas a las más generales


//Rutas más especficas
router.get('/heroes/dashboard', renderizarTodosLosSuperHeroesController);
router.get('/heroes/quienessomos', renderizarQuinesSomosController);
router.get('/heroes/mayores-30', obtenerMayoresDe30Controller);
router.get('/heroes/buscar/:atributo/:valor', buscarHeroesPorAtributoController); //cuando uso req.params
//router.get('/heroes/buscar', buscarHeroesPorAtributoController);// cuando uso req.query;

router.get('/heroes/agregar', renderizarAddSuperheroController);
//router.get('/heroes/agregar', renderizarAddSuperheroController);

router.get('/heroes/:id/editar', renderizarEditSuperheroController);
router.get('/heroes/:id/eliminar', renderizarDeleteSuperHeroController);

//ruta general
router.get('/heroes', renderizarInicioController);


router.get('/heroes/:id', obtenerSuperHeroePorIdController);

//rutas de edición
router.post('/heroes/nuevo', validarSuperHeroe, handleValidationErrors, nuevoSuperHeroController);
//router.post('/heroes/nuevo', validarSuperHeroe, handleValidationErrors('addSuperhero', {title: 'Agregar Superhéroe'}), nuevoSuperHeroController);
router.post('/heroes/:id/editar', validarSuperHeroe, handleValidationErrors, actualizarSuperHeroController)
//router.post('/heroes/:id/editar', validarSuperHeroe, handleValidationErrors('editSuperhero', {title: 'Editar Superhéroe'}), actualizarSuperHeroController);
router.post('/heroes/:id/eliminar', eliminarSuperHeroController);
//router.put('/heroes/actualizar/:id', validarSuperHeroe, handleValidationErrors, actualizarSuperHeroController);
router.delete('/heroes/eliminar/:id', eliminarSuperHeroController);
router.delete('/heroes/eliminarpornombre/:nombreReal', eliminarSuperHeroPorNombreController);

export default router;