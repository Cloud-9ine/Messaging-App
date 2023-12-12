const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    from : {
        type : Schema.Types.ObjectId,
        ref : 'Users',
        required : true
    },
    to : {
        type : Schema.Types.ObjectId,
        ref : 'Users',
        required : true
    }, 
    message: {
        type : Text,
        required : true
    }
}, {timestamps: true});

module.exports = mongoose.model('Chat', chatSchema);