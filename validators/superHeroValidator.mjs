import { body } from "express-validator";

//Aquí voy a definir las reglas de validaciones para cada 
//conjunto de rutas o funcionalidades

export const validarSuperHeroe = [
    
    body('nombreSuperHeroe')
        .trim()
        .escape()
        .notEmpty().withMessage('El nombre del superheroes es requerido')
        .isLength({min: 3, max:60}).withMessage('El nombre del superheroe debe tener entre 3 y 60 caracteres'), 
    body('nombreReal')
        .trim()
        .escape()
        .notEmpty().withMessage('El nombre real del superheroe es requerido')
        .isLength({min: 3, max: 60}).withMessage('El nombre real del superheroe de tener entre 3 y 60 caracteres'), 
    body('edad')
        .trim()
        .escape()
        .notEmpty().withMessage('La edad es un valor requerido')
        .isNumeric().withMessage('La edad debe ser un valor numérico')
        .custom((edad) => edad >= 0).withMessage('La edad debe ser un valor positivo'), 
    /*body('poderes')
        .isArray({min: 1}).withMessage('Poderes debe ser un array con al menos un elemento')
        .custom(
            (poderes) => {
                for(const poder of poderes){
                    if(typeof poder !== 'string' || poder.length < 3 || poder.length > 60){
                        throw new Error('Los poderes deben ser de tipo string entre 3 y 60 caracteres')
                    }
                }
                return true;
            }
        )*/
        body('poderes')
        .custom((value) => {
            // Dividimos la cadena separada por comas en un array
            const poderesArray = value.split(',').map(poder => poder.trim());
    
            // Validamos si el array tiene al menos un poder válido
            if (poderesArray.length < 1 || poderesArray.some(poder => poder === '')) {
                throw new Error('Poderes debe tener al menos un poder válido');
            }
    
            // Validamos que cada poder sea una cadena válida
            for (const poder of poderesArray) {
                // Chequeo si es numérico (valores como "123", "12.34" o "-56" no deben ser válidos)
                if (!isNaN(Number(poder))) {
                    throw new Error('Los poderes no pueden ser valores numéricos');
                }
    
                // Validamos longitud del texto
                if (poder.length < 3 || poder.length > 60) {
                    throw new Error('Los poderes deben tener entre 3 y 60 caracteres');
                }
            }
    
            // Asignamos el array de poderes de vuelta a req.body.poderes
            //req.body.poderes = poderesArray;
            return true;
            })      
];