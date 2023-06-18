let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

// create a reference to the model
let BusinessList = require('../models/book');

module.exports.displayBookList = (req, res, next) => {
    BusinessList.find().collation({locale:'en',strength: 2}).sort({name:1}).then((businessList) => {
            res.render('book/list',
            {title: 'Business List',
            BookList: businessList,
            displayName: req.user ? req.user.displayName : ''});
    }).catch((err) => {
        console.error(err);
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('book/add', {title: 'Add Book', 
    displayName: req.user ? req.user.displayName : ''})          
}

module.exports.processAddPage = (req, res, next) => {
    let newContact = BusinessList({
        "name": req.body.name,
        "contact": req.body.contact,
        "email": req.body.email
    });

    BusinessList.create(newContact, (err, contact) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/book-list');
        }
    });

}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    BusinessList.findById(id, (err, bookToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('book/edit', {title: 'Edit Book', book: bookToEdit, 
            displayName: req.user ? req.user.displayName : ''})
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedContact = BusinessList({
        "_id": id,
        "name": req.body.name,
        "contact": req.body.contact,
        "email": req.body.email
    });

    BusinessList.updateOne({_id: id}, updatedContact, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/book-list');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    BusinessList.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             // refresh the book list
             res.redirect('/book-list');
        }
    });
}