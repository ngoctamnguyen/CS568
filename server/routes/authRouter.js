const express = require('express');

const authController = require('../controllers/authController');


const router = express.Router();

router.post('/', authController.login);

router.get('/:username', authController.getMyRole);


module.exports = router;