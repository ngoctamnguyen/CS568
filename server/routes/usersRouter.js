const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');

router.get('/', userController.getAll);

router.get('/:id', userController.getById);

router.post('/', userController.saveUser);

router.put('/:id',userController.updateOneUser);

router.delete('/:id', userController.deleteById);



module.exports = router;