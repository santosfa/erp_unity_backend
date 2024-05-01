// projectPlanModel.js
const db = require('../../config/database');

const projectPlanSchema = new db.Schema({
    ordem:{
        type: Number,
        required: true
    },
    DtPrevInMont:{
        type: Date,
        required: true
    },
    DtPrevEntrega:{
        type: Date,
        required: true
    },
    execucao:{
        type: Number
    },
    execucaoAnterior:{
        type: Number
    }




    
}
);

const projectPlans = db.model('projectplan',projectPlanSchema );

module.exports = projectPlans;