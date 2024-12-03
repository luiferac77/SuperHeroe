import { validationResult } from "express-validator";

/* ######### A ESTE CODIGO LO COMENTO PORQUE SON PEURBAS PARA RENERIZAR ERRORES DE VALIDACION EN LA VISTA ###### */

/*export const handleValidationErrors = (vista, options = {}) => {

    return (req, res, next) => {
        const errors = validationResult(req);
        
        if(!errors.isEmpty()){
            //console.log(errors);
            return res.status(400).render(vista, {
                title: 'Error al cargar superhéroe',
                ...options, 
                //status: 'error', 
                //message: 'error de validación', 
                //errors: errors.array().map(error =>({
                //    field: error.param, 
                 //   message: error.msg
                //}))
               errors: errors.array(),
               oldInputs: req.body, 
               superheroe: req.body.superheroe
            });
        }
        next();
    };

};

import { validationResult } from "express-validator";

export const handleValidationErrors = (vista, options = {}) => {
    return (req, res, next) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).render(vista, {
                title: 'Error al cargar superhéroe',
                ...options, 
                errors: errors.array(),
                oldInputs: req.body, // Los datos que el usuario ingresó
                superheroe: req.body.superheroe || {} // No debes hacer una consulta aquí
            });
        }
        next();
    };
    
};*/

/*######################################################################################*/

/* Este código me va a capturar los errores para mostrar en formato json*/
export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            status: 'error', 
            message: 'error de validación', 
            errors: errors.array().map(error =>({
                field: error.param, 
                message: error.msg
            }))
        });
    }
    next();
};