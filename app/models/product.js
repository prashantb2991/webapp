var mongoose = require('mongoose');

module.exports = mongoose.model('Product', {
    name: {
        type: String,
        default: ''
    },
    quantity: {
        type: Number,
        default: 0
    },
});