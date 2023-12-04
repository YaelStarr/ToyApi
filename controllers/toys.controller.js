// const { Toy } = require("../models/Toy.model");

const { Toy } = require("../models/toy.model");

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {import("express").NextFunction} next 
 * @returns {Response}
 */

exports.addNewToy = async (req, res, next) => {
    const body = req.body;
    const userId = res.locals.userId;
    try {
        const newToy = new Toy(body);
        newToy.ownerId = userId;
        newToy.id = newToy._id;
        await newToy.save();
        res.status(201).send(newToy);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

exports.getToys = async (req, res, next) => {
    try {
        const toys = await Toy.find();
        res.send(toys);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}


exports.getToyById = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(id);
        const toy = await Toy.findOne({ id }).select("-__v");
        res.send(toy);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}


exports.searchToysByCategory = async (req, res, next) => {
    try {
        const { catName } = req.params;
        const toys = await Toy.find({ catName: req.params.catName }, req.body);
        res.send(toys);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}


exports.searchToyByNameOrInfo = async (req, res, next) => {
    try {
        const { page } = req.query;
        const perPage = 10;
        const skip = (page - 1) * perPage;
        const { s } = req.query;
        const toys = await Toy.find({ $or: [{ name: s }, { info: s }] })
            .skip(skip).limit(perPage);
        res.send(toys)
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}




exports.deleteToy = async (req, res, next) => {
    const body = req.body;
    try {
        const toy = await Toy.deleteOne({ id: req.params.delId }, req.body, { new: true });
        res.json(toy);
    } catch (error) {
        console.log(error);
        res.sendStatus(400).send(error);
    }
};



exports.editToy = async (req, res, next) => {
    try {
        const toy = await Toy.updateOne({ _id: req.params.editId }, req.body);
        res.json(toy);
    } catch (error) {
        console.log(error);
        res.sendStatus(400).send(error);
    }
};


//     const userId = res.locals.userId;
//     const toys = await Toy.find().populate({ ownerId: userId });