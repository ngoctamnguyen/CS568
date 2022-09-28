// const Users = require('../models/users');
const Client = require("../models/Client");
const { ObjectId } = require('mongodb');

exports.getAll = async (req, res, next) => {
    res.json(await Client.find());
};

exports.getById = async (req, res, next) => {
    res.json(await Client.findById(req.params.id));
};

exports.saveUser = async (req, res, next) => {
    try {
        const result = await new Client(req.body).save();
        res.json(result);
    } catch (error) {
        next(error);
    }
};

exports.updateOneUser = async (req, res) => {
    const result = await Client.updateOne({ _id: new ObjectId(req.params.id) }, req.body);
    res.json(result);
};


exports.deleteById = async (req, res) => {
    await Client.findByIdAndDelete(req.params.id);
    res.json({ _id: req.params.id });
};
