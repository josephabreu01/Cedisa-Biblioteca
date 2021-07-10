const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const config = require('../config');
const checkJWT = require('../middlewares/ckeck-jwt')

router.post('/signup', (req, res, next) => {
   let user = new User();

   user.email = req.body.email;
   user.nombre = req.body.nombre;
   user.contrasena = req.body.contrasena;
   user.esAdministrador = req.body.esAdministrador;

   User.findOne({ email: req.body.email }, (err, existingUser) => {

      if (existingUser) {
         res.json({
            success: false,
            message: 'Ya exciste una cuenta con este email'
         })
      }

      else {
         user.save();

         var token = jwt.sign({
            user: user,
         }, config.secret, {
            expiresIn: '7d'
         });


         res.json({
            success: true,
            message: 'Su token',
            token: token
         })
      }

   });

});

router.post('/login', (req, res, next) => {

   User.findOne({ email: req.body.email }, (err, user) => {
      if (err) throw err;

      if (!user) {
         res.json({
            success: false,
            message: 'Autenticacion fallida , usuario no encontrado'
         })


      } else if (user) {

         var validarContrasena = user.compareContrasena(req.body.contrasena);

         if (!validarContrasena) {
            res.json({
               success: false,
               message: 'Autenticacion fallida , Contrasena equivocada'
            })
         } else {

            var token = jwt.sign({
               user: user,
            }, config.secret, {
               expiresIn: '7d'
            });
            

            res.json({
               success: true,
               message: 'Su token',
               token: token
            })
            
            
         }
      }


   })
})


router.route('/profile')
.get(checkJWT, (req, res, next) => {
   
   User.findOne({_id: req.decoded.user._id}, (err, user) => {

        res.json({
           success:true,
           usuario:user,
           message: "Exitoso"
        });
        
   });
})
.post(checkJWT, (req, res, next) => {
   User.findOne({_id: req.decoded.user._id}, (err, user) => {
      if (err) return next(err);

      req.body.nombre ? user.nombre = req.body.nombre : '';
      req.body.email ? user.email = req.body.email : '';
      req.body.contrasena ? user.contrasena = req.body.contrasena : '';

      user.esAdministrador = req.body.esAdministrador;

      user.save();

      res.json({
         succcess: true,
         message:"Se edito tu perfil"
      })

   })
})


module.exports = router;