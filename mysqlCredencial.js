const mysql = require('mysql');

const connectionMySql = mysql.createConnection({
    host :'192.168.0.4',
    user : 'integracion',
    password : '!@-Integra*2021',
    database: 'cedisa_20201130'
});

connectionMySql.connect((err)=>{
    if (err) throw err;
    
    console.log('mysql conectado')
})

module.exports = connectionMySql;