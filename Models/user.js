const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
    },
    email:{
        type: String,
    },
    addressline1:{
        type: String,
    },
    addressline2:{
        type: String,
    },
    postalcode:{
        type: Number,
    },
    password:{
        type: String,
    }
})

module.exports = mongoose.model('user',UserSchema)