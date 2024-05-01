const db = require('../../config/database');

const { default: mongoose } = require('mongoose');

const LocationSchema = new db.Schema({

    companyCode:{
        type: String,
        require: true,
        select: false
    },
    locationSequence:{
        type: Number,
        require: true,
    },
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Customer',
        require: true,
    },
    locationName:{
        type: String,
        require: true,
    },
    locationAddr:{
        type: String,
        require: true,
    },


},
{
    timestamps: true
}
);

const Location = db.model('Location',LocationSchema );

module.exports = Location;
