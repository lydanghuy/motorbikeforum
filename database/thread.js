const mongoose = require('mongoose');

const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;



const commentSchema = new Schema({
    vote:{
        type: Number,
        default : 0
    },
    comment:{
        type: String,
        required: true
    },
    author:{
        type: mongoose.Schema.Types.ObjectId, //create reference to user
        ref : 'User'
    }
},
    {
        timestamps: true
});
const likeSchema = new Schema({
    // toggle_like:{
    //     type : Boolean,
    //     default : false
    // },
    like_author:{
        type: mongoose.Schema.Types.ObjectId, //create reference to user
        ref : 'User'
    }
},
    {
        timestamps: true
});

const threadSchema = new Schema({

    thread_author: {
        type: mongoose.Schema.Types.ObjectId, //create reference to user
        ref : 'User'
    },
    category:{
        type: String,
        default: ''
    },
    title:{
        type: String,
        default: ''
    },
    content:{
        type: String,
        default: ''
    },


    view :{
        type: Number,
        default : 0
    },

    likes : [likeSchema],

    comments:[commentSchema]
 },
    {
        timestamps: true

});

var Threads = mongoose.model('Thread',threadSchema);
module.exports = Threads;
