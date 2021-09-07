const router = require('express').Router();
const Cita = require('../models/cita');

router.route('/cita')
.get((req,res,next) =>{
    Cita.find({paciente:req.params.id}, (err, cita) =>{
        res.json({
            success: true,
            message: "Excitoso",
            cita: cita
        })
    })
})
.post((req,res,next) =>{
    let cita = new Cita();
    cita.paciente = req.params.paciente;
    cita.estudios = req.params.estudios;
    cita.duracionCita = req.params.duracionCita;
    cita.inicioCita = req.params.inicioCita;
    cita.finCita = req.params.finCita;
    cita.representante = req.params.representante;
    cita.sucursal = req.params.sucursal;
    cita.creado = req.params.creado;
})