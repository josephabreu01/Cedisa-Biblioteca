const router = require('express').Router();
const Categoria = require('../models/categoty');
const Estudios = require('../models/estudios');
const async = require('async');

router.get('/estudios/:page', (req, res, next) => {
    const porPagina = 12;
    const pagina = req.params.page;
   
    async.parallel([
      function(callback) {
        Estudios.count({}, (err, count) => {
          var totalEstudios = count;
          callback(err, totalEstudios);
        });
      },
      function(callback) {
        Estudios.find({})
          .skip(porPagina * pagina)
          .limit(porPagina)
          .populate('categoria')
          .populate('owner')
          .exec((err, estudios) => {
            if(err) return next(err);
            callback(err, estudios);
          });
      }
    ], function(err, results) {
      var totalEstudios = results[0];
      var estudios = results[1];
     
      res.json({
        success: true,
        message: 'category',
        estudios: estudios,
        totalEstudios: totalEstudios,
        paginas: Math.ceil(totalEstudios / porPagina)
      });
    });
    
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
    Estudios.findById({ _id: req.params.id })
        .populate('categoria')
        .populate('owner')
        .exec((err, estudio) => {
        if (err) {
            res.json({
                success: false,
                message: ' Estudio no encontrado'
            });
        } else {
            if (estudio) {
                res.json({
                    success: true,
                    estudio: estudio
                });
            }
        }
    });
});

module.exports = router;