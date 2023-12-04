const mongoose = require("mongoose");


const toySchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: false
    },
    info: {
        type: String,
        required: false
    },
    catName: {
        type: String,
        required: false
    },
    price: {
        type: Number
    },
    date_created: {
        type: Date,
        required: false,
        default: Date.now()
    },
    ownerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    imgUrl:{
        type: String,
        required: false
    }
});

const Toy = mongoose.model("Toy", toySchema);
module.exports.Toy = Toy;