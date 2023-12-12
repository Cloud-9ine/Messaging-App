const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : {
        type : String,
        required : true
    }, 
    email : {
        type : String,
        required : true
    },
    password: {
        type : String,
        required : false
    },
    recipients: {
        type : [Schema.Types.ObjectId],
        default : undefined,
        required : false
    },
    chats: {
        type : [Schema.Types.ObjectId],
        default : undefined,
        ref : 'Chats',
        required : false
    }
}, {timestamps: true});

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;