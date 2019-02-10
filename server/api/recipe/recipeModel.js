const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Comment = require('../comment/commentModel');

const flavorSchema = new Schema({
    company: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    percentage: {
        type: Number,
        required: true
    },
    vg: Number,
    pg: Number
});

const recipeSchema = new Schema({
    creator: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        username: {
            type: String,
            required: true
        },
    },
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    pg: {
        type: Number,
        min: 0,
        max: 100,
        required: true
    },
    vg: {
        type: Number,
        min: 0,
        max: 100,
        required: true
    },
    strength: Number,
    nicotineStrength: Number,
    vgNicotine: {
        type: Number,
        min: 0,
        max: 100
    },
    pgNicotine: {
        type: Number,
        min: 0,
        max: 100
    },
    suggestedSteepTime: Number,
    flavors: [flavorSchema],
    comments: [
       /* {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }*/
       Comment.schema
    ]
});

module.exports = mongoose.model('Recipe', recipeSchema);