const db = require('../../config/database');
const { default: mongoose } = require('mongoose');

const ContractSchema = new db.Schema({
    contractSequence: {
        type: String, 
        required: true,
        unique: true
    },
    office: {
        type: String,
        required: true,
    },
    customer: {
        customerName: {
            type: String,
            required: true,
        },
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer', // Supondo que haja um modelo 'Customer' relacionado
            required: true,
        },
    },
    funcionalLocation: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
    }],
    contractType: {
        type: String,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    salesman: {
        name: {
            type: String,
            required: true,
        },
        salesmanId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Salesman', // Supondo que haja um modelo 'Salesman' relacionado
            required: true,
        },
    },
    notes: [{
        note: {
            type: String,
        },
        createdAt: {
            type: Date,
        },
    }],
    contractStartDate: {
        type: Date,
    },
    contractEndDate: {
        type: Date,
    },
    contractTerminationDate: {
        type: Date,
    },
    monthlyValue: {
        type: Number,
    }
},
{
    timestamps: true
});

ContractSchema.index({ contractSequence: 1});
ContractSchema.index({ customer:1 });

const Contract = db.model('Contract', ContractSchema);

module.exports = Contract;
