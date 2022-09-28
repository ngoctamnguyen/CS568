
const Meal = require("../models/Meal");
const { ObjectId } = require('mongodb');

exports.getAll = async (req, res, next) => {
    res.json(await Meal.find());
};

exports.getById = async (req, res, next) => {
    res.json(await Meal.findById(req.params.id));
};

exports.getReviews = async (req, res, next) => {
    res.json(await Meal.findById(req.params.id));
}

exports.saveMeal = async (req, res, next) => {
    console.log(req.body)
    try {
        const result = await new Meal(req.body).save();
        res.json(result);
    } catch (error) {
        next(error);
    }
};

exports.updateOneMeal = async (req, res) => {
    const result = await Meal.updateOne({ _id: new ObjectId(req.params.id) }, req.body);
    res.json(result);
};

exports.updateDeleted = async (req, res) => {
    const result = await Meal.updateOne({ _id: new ObjectId(req.params.id) }, {$set: {isDelete: req.body.isDelete}} ); 
    res.json(result);
}