const { Router } = require('express');
const getPok= require('./getPok.js')
const fetch = require('node-fetch')
const db = require('../db.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/', getPok)





module.exports = router;
