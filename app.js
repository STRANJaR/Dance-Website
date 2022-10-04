const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
var mongoose = require("mongoose")
mongoose.connect('mongodb://localhost:27017/contactDance');
const port = 80;

// Express spasific stuff 
app.use('/static', express.static('static')) // For serving static web
app.use(express.urlencoded());

// Contact schema 
const contactschema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    concern: String
});
const contact = mongoose.model('contact', contactschema);




// PUG spasific stuff
app.set('view engine', 'pug'); // set the templetes engine as pug 
app.set('views', path.join(__dirname, 'views')); // Set the views directory

// ENDPOINS 
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params);
});

app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);
});

app.post('/contact', (req, res) => {
    var myData = new contact(req.body);
    myData.save().then(() => {
        res.send("The Massage Sent Successfully")
    }).catch(() => {
        res.status(400).send("This was not saved to the database")
        
    });

    // res.status(200).render('contact.pug');
});



// SERVER 
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`)

});