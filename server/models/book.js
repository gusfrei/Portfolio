let mongoose = require('mongoose');

// create a model class
let bookModel = mongoose.Schema({
    name: String,
    contact: String,
    email: String,
},
{
    collection: "business_list"
});

module.exports = mongoose.model('BusinessList', bookModel);