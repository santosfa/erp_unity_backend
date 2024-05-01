const db = require('../../config/database');
const mongoose = require('mongoose');

const taskSchema = new db.Schema({
    macaddress:{
        type: String, 
        required: true
    },
    type:{
        type: Number, 
        required: true
    },
    title:{
        type:String, 
        required: true
    },
    description:{
        type:String, 
        required: true
    },
    when:{
        type: Date, 
        required: true
    },
    done:{
        type: Boolean, 
        default: false
    },
    created:{
        type: Date, 
        default: Date.now()
    }
});

const Task = db.model('Task',taskSchema);
module.exports = Task;
