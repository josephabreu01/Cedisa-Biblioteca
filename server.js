const express = require('express');
const morgan = require('morgan');
const BodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const mysql = require('mysql');


const config = require('./config');
const configMySql = require('./mysqlCredencial');



const app = express();

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    err
        ? console.log("Error" + err)
        : console.log('Base de datos conectada')

});

mysql.createConnection({
    host :'192.168.0.4',
    user : 'integracion',
    password : '!@-Integra*2021',
    database: 'cedisa'
});





app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(morgan('dev'));
app.use(cors());


const userRoutes = require('./routes/account');
const mainRoutes = require('./routes/main');
const administradorRoutes = require('./routes/administrador');
const estudiosSearchRoutes = require('./routes/estudios-search');
const citaRoutes = require('./routes/');

app.use('/api', mainRoutes);
app.use('/api/accounts', userRoutes);
app.use('/api/administrador', administradorRoutes);
app.use('/api/search', estudiosSearchRoutes)

app.listen(config.port, (err) => {
    console.log("aplicacion corriendo en el puerto " + config.port);
});


