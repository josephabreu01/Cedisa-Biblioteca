const router = require('express').Router();

const Categoria = require('../models/categoty');
const Estudios = require('../models/estudios');
const async = require('async');
const mysql = require('mysql')
const connectionMySql = mysql.createConnection({
    host: '192.168.0.4',
    user: 'integracion',
    password: '!@-Integra*2021',
    database: 'cedisa_20201130'
});

router.get('/estudios/:page', (req, res, next) => {
    // const porPagina = 12;
    // const pagina = req.params.page;

    // async.parallel([
    //   function(callback) {
    //     Estudios.count({}, (err, count) => {
    //       var totalEstudios = count;
    //       callback(err, totalEstudios);
    //     });
    //   },
    //   function(callback) {
    //     Estudios.find({})
    //       .skip(porPagina * pagina)
    //       .limit(porPagina)
    //       .populate('categoria')
    //       .populate('owner')
    //       .exec((err, estudios) => {
    //         if(err) return next(err);
    //         callback(err, estudios);
    //       });
    //   }
    // ], function(err, results) {
    //   var totalEstudios = results[0];
    //   var estudios = results[1];

    //   res.json({
    //     success: true,
    //     message: 'category',
    //     estudios: estudios,
    //     totalEstudios: totalEstudios,
    //     paginas: Math.ceil(totalEstudios / porPagina)
    //   });
    // });
    connectionMySql.query({
        sql: 'select * from products pr inner join branchs_has_products bhp using (product_id) where company_id <> 4 and bhp.branch_id= ' + 1 + ' LIMIT 24',
        timeout: 40000,

    }, (error, results, fields) => {
        var totalEstudios = results.length;

        res.json({
            success: true,
            estudios: results,
            totalEstudios: totalEstudios,
            message: "funciono"
        })
    })

});




router.route('/categorias')
    .get((req, res, next) => {
        Categoria.find({}, (err, categorias) => {
            res.json({
                success: true,
                message: "Excitoso",
                categorias: categorias
            })
        })
    })
    .post((req, res, next) => {
        let categoria = new Categoria();
        categoria.nombre = req.body.categoria;
        categoria.save();

        res.json({
            success: true,
            message: 'Excitoso'
        })
    })


router.get('/categorias/:id', (req, res, next) => {
    const porPagina = 10;
    const pagina = req.params.pagina

    async.parallel([
        function (callback) {
            Estudios.count({ categoria: req.params.id }, (err, count) => {
                var totalEstudios = count;
                callback(err, totalEstudios);
            })
        },
        function (callback) {
            Estudios.find({ categoria: req.params.id })
                .skip(porPagina * pagina)
                .limit(porPagina)
                .populate('categoria')
                .populate('owner')
                .exec((err, estudios) => {
                    if (err) return next(err);

                    callback(err, estudios);
                });
        },
        function (callback) {
            Categoria.findOne({ _id: req.params.id }, (err, categoria) => {
                callback(err, categoria)
            });
        }
    ], function (err, results) {
        var totalEstudios = results[0];
        var estudios = results[1];
        var categoria = results[2];
        console.log(results);

        res.json({
            success: true,
            message: 'categoria',
            estudios: estudios,
            nombreCategoria: categoria ? categoria.nombre : categoria,
            totalEstudios: totalEstudios,
            paginas: Math.ceil(totalEstudios / porPagina)
        });

    });

});

router.get('/estudio/:id', (req, res, next) => {
    var estudio;
    var ars;
    var medico;
    var querys = {
        estudio: 'select * from products pr inner join branchs_has_products bhp using (product_id) where company_id <> 4 and bhp.branch_id= ' + 1 + ' and product_id= ' + req.params.id + '  LIMIT 24',
        ars: 'select pr.product_id, pr.product_name,pr.`status`,pr.price1 as precio_privado, ig.name as tipo_estudio, ins.insurance_id as cod_seguro, ins.name as seguro, phi.price as precio_seguro, coverage from products pr inner join branchs_has_products bhp using (product_id) inner join products_has_insurance phi ON phi.product_id = pr.product_id inner join insurance ins ON ins.insurance_id = phi.insurance_id inner join inventory_groups ig ON ig.inventory_group_id = pr.inventory_group_id where company_id <> 4 and bhp.branch_id=' + 1 + ' and pr.status = "A" and is_ars = ' + 1 + ' and pr.product_id= ' + req.params.id + '',
        medico: 'select tec.tech_id, tec.name as medico, br.branch_id, br.name as sucursal,hm.dias, hm.horario from products pr inner join branchs_has_products bhp using (product_id) inner join inventory_groups_has_technician igt using (inventory_group_id) inner join horario_medico hm using (tech_id) inner join branchs br ON br.branch_id = hm.branch_id inner join technician tec ON tec.tech_id = hm.tech_id where company_id <> 4 and bhp.branch_id=' + 1 + ' and pr.product_id= ' + req.params.id + ''
    };
    
    async.parallel([
        function (callback) {
            connectionMySql.query({
                sql: querys.estudio,
                timeout: 40000

            }, (error, results) => {
                estudio = results;
                callback(error, estudio);
            })

        },
        function (callback) {
                connectionMySql.query({
                    sql: querys.ars,
                    timeout: 40000
        
                }, (error, results) => {
        
                    ars = results;
                    callback(error,ars)
                })

        },
        function (callback) {
            connectionMySql.query({
                sql: querys.medico,
                timeout: 40000
            }, (error, results, fields) => {

                medico = results
                callback(error,medico)
            })

        }
    ], function (err, results) {
        var estudios = results[0];
        var arss = results[1];
        var medicos = results[2];
        

        res.json({
            success: true,
            message: 'Estudio',
            estudio: estudios,
            ars: arss,
            medico: medicos,
        });

    });

    // connectionMySql.query({
    //     sql: querys.estudio,
    //     timeout: 40000

    // }, (error, results, fields) => {
    //     estudio = results;

    //     connectionMySql.query({
    //         sql: querys.ars,
    //         timeout: 40000

    //     }, (error, results, fields) => {

    //         ars = results;

    //         connectionMySql.query({
    //             sql: querys.medico,
    //             timeout: 40000
    //         }, (error, results, fields) => {

    //             medico = results
    //             res.json({
    //                 success: true,
    //                 estudio: estudio,
    //                 ars: ars,
    //                 medico: medico,
    //                 message: "funciono"
    //             })

    //         })



    //     })

    // })

});

module.exports = router;