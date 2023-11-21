const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path')


// Configuraciones
app.set('port', 5001);
// app.set('views', path.join(__dirname, 'views')); no se porque rompe esta línea
app.set('views', './src/views');
app.set('view engine', 'ejs')


// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

// Rutas
app.use(require('./routes/index'))

// Static
app.use(express.static(path.join(__dirname, 'public')));

// 404
app.use((req, res, next) => {
    res.status(404).send('404 Error')
})


async function main() {
    await app.listen(app.get('port'))
    console.log('funcionando en el puerto', app.get('port'))
}
main();