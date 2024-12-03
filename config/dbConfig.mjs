import mongoose from "mongoose";

export const connectDB = async () => {
    
    const uri = 'mongodb+srv://Grupo-12:grupo12@cursadanodejs.ls9ii.mongodb.net/Node-js';

    try {
        await mongoose.connect(uri);
        console.log('Conexión exitosa');
    } catch (error) {
        console.error('Error al conectarse:', error);
        process.exit(1);
    }
}

//connectDB();