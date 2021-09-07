const router = require('express').Router();
const Estudios = require('../models/estudios');
const mysql = require('mysql');


const algoliasearch = require('algoliasearch');
const client = algoliasearch('PIQ9925HKD', '689de093f04dc66fe2b6b0a70ac151d1');
const index = client.initIndex('biblioteca');

const connectionMySql = mysql.createConnection({
  host: '192.168.0.4',
  user: 'integracion',
  password: '!@-Integra*2021',
  database: 'cedisa_20201130'
});

router.get('/', (req, res, next) => {

  if (req.query.query) {
    var filtrados = [];
    var query = req.query.query.toUpperCase();
    // index.search({
    //   query: req.query.query,
    //   page: req.query.page,
    // }, (err, content) => {

    //   res.json({
    //     success: true,
    //     message: "Here is your search",
    //     status: 200,
    //     content: content,
    //     search_result: req.query.query
    //   });

    // });
   
      connectionMySql.query({
        sql: 'select * from products pr inner join branchs_has_products bhp using (product_id) where company_id <> 4 and bhp.branch_id= ' + 1 + '',
        timeout: 40000,
      }, (error, results, fields) => {

        

        results.forEach(element => {

          if (element.product_name.includes(query)) {
            filtrados.push(element);
          }
        });

        res.json({
          success: true,
          content: filtrados,
          message: "funciono",
          estudios: results,
        })
      })
    } 



  
});




module.exports = router;