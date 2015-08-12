var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var thoughtModel = new Schema({
    title: { type: String },
    description: { type: String },
    createDate: { type: Date },
    updateDate: { type: Date }
});

module.exports = mongoose.model('Thought', thoughtModel);
