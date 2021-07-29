const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({

    text:{
        type: String,
        required: true
    },

    isCompleted:{
        type: Boolean,
        required: true
    }
});

const todo = module.exports = mongoose.model('todo', todoSchema);