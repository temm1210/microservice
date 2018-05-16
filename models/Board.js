var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BoardSchema = new Schema({
    title: String,
    writer: String,
    contents: String,
    comments:[
        {
            id: String,
            ment: String,
            date:{type:Date, default: Date.now()}
        }
    ],
    count:{type:Number, default:0},
    date:{type:Date, default:Date.now()},
    updated:{type:Date, default:Date.now()},
})

module.exports = mongoose.model('Board', BoardSchema);