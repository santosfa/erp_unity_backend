const db = require('../../config/database');
const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const userSchema = new db.Schema({
    companyCode     :{type: String,     required:   true},
    name            :{type: String,     required:   true},
    email           :{type: String,     required:   true},
    password        :{type: String,     select:     false,  required: true},
    token           :{type: String,     select:     false,  required: false},
    tokenExpires    :{type: Date,       select:     false,  required: false},
    active          :{type: Boolean,    default:    true},
    profile         :{type: String,     default:    'user'}
}, 
{   
    timestamps      : true
}
);


userSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password,8);
    this.password = hash;
    next();
});

const User = db.model('User',userSchema);
module.exports = User;






