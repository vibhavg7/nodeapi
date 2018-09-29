var mongoose = require('mongoose');

var CounterSchema = new mongoose.Schema({
    _id: String,
    seq: { type: Number, default: 0 }
});

mongoose.model('Counters',CounterSchema);
module.exports = mongoose.model('Counters');
