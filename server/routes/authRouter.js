const express = require('express');
const natlParks = require('./../../models/npModels');
const cookieParser = require('cookie-parser');

const authController = require('./../controllers/authController');
const authRouter = express.Router();
// app.use('/natlparks/signin', authRouter);
// GOALS
// homepage - do you have an account? yes or no

//signup 
authRouter.post('/', authController.addUsers, authController.setSSIDCookie, (req, res) =>{
    res.redirect(200, '/login');
});
//once a user is created - redirect to login
authRouter.post('/login', authController.verifyUser,
 //set SSID
 // start session? 
(req, res) =>{
    //send to main landing page
});

// login is incorrect send back to login 

// have link to reset password













module.exports = authRouter;