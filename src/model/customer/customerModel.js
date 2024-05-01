const db = require('../../config/database');
const mongoose = require('mongoose');

const CustomerSchema = new db.Schema({

    customerId:{
        type: String,
        require: true,
        unique: true
    },
    customerName:{
        type: String,
        require: true,
    },
    address:{
        type: String,
        require: true,
    },
    suburb:{
        type: String,
        require: true,
    },
    suburbLocal:{
        type: String,
        require: true,
    },
    city:{
        type: String,
        require: true

    },
    state:{
        type: String,
        require: true
    },
    country:{
        type: String,
        require: true
    },
    postcode:{
        type: Number,
        require: true
    },
    phone:{
        type: String,
        require: true
    },
    contact:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    mainSegmentType:{
        type: String,
        require: true
    },
    subSegmentType:{
        type: String,
        require: true
    },
    contracts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contract' }],

},
{
    timestamps: true
}
);

const Customer = db.model('Customer',CustomerSchema );

module.exports = Customer;



