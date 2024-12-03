import express from 'express';
import { connectDB } from './config/dbConfig.mjs';
import router from './routes/superHeroRoutes.mjs';
import path from 'path';
import expressEjsLayouts from 'express-ejs-layouts';

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.resolve('views'));//directorio de las vistas
app.use(expressEjsLayouts);
app.set('layout', 'layout');
app.use(express.static(path.resolve('public')));//servir archivos estáticos
app.use(express.json());
app.use(express.urlencoded({extend: true}));

const loggerMiddleware =  (req, res, next) => {
    console.log(`Request recibida: ${req.method} ${req.url}`);
    next(); //pasa el control al siguiente middleware
}

app.use(loggerMiddleware);

connectDB();

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});