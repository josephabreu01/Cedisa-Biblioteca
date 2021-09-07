const router = require('express').Router();
const Estudio = require('../models/estudios');

const algoliasearch = require('algoliasearch');
const client = algoliasearch('PIQ9925HKD', '689de093f04dc66fe2b6b0a70ac151d1');
const index = client.initIndex('biblioteca');
const checkJWT = require('../middlewares/ckeck-jwt');
const mysql = require('../mysqlCredencial');



router.route('/estudios')
    .get(checkJWT, (req, res, next) => {
        Estudio.find({ owner: req.decoded.user._id })
            .populate('owner')
            .populate('categoria')
            .exec((err, estudios) => {
                
                if (estudios) {
                    res.json({
                        success: true,
                        message: 'Estudios',
                        estudios: estudios
                    });
                    
                }
            });

        
    })
    .post(checkJWT, (req, res, next) => {
        let estudio = new Estudio();

        estudio.owner = req.decoded.user._id;
        estudio.categoria = req.body.categoriaId;
        estudio.titulo = req.body.titulo;
        estudio.precio = req.body.precio;
        estudio.descripcion = req.body.descripcion;

        estudio.save();
        estudio.SyncToAlgolia();
        res.json({
            success: true,
            message: 'Estudio agregado'
        });

        
        
        
    });

module.exports = router;