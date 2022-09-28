const express = require('express');
const router = express.Router();

const mealController = require('../controllers/mealController');

router.get('/', mealController.getAll);

router.get('/:id', mealController.getById);

router.get('/:id/reviews', mealController.getReviews);

router.post('/', mealController.saveMeal);

router.put('/:id',mealController.updateOneMeal);

router.put('/:id/delete',mealController.updateDeleted);

module.exports = router;