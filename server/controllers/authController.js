const db = require('./../../models/npModels');
const path = require('path');

const authController = {

//set up new account    
addUsers  (req, res, next) {
// check to make sure we have all the data, if anything is missing then we need to error out
if (!req.body.username || !req.body.password || !req.body.firstName || !req.body.lastName || !req.body.email) return res.send('data missing from request body');
// deconstruct request body
const { username, password, firstName, lastName, email } = req.body;
// console.log(username, password, firstName, lastName, email)
// set string variable
const addUser = 'INSERT INTO users (username, password, firstName, lastName, email) VALUES ($1, $2, $3, $4, $5)';
// turn values into array
const values = [username, password, firstName, lastName, email];
//add request

// console.log(db.query)

db.query(addUser, values)
 .then((data) => {
console.log(data)
if (data) console.log('got data')
 })
.catch ((err) => {
console.log(err)
});

next();
// if no error then redirect to login page 

},
// log in
verifyUser (req, res, next) {
// query database to make sure that UN and PW are an exact match if so then they can go to a protected route 
// collect UN and pass. save the PW as a temp varibale and if the UN is in the DB then check the Password 
// console.log(req.body)
if (!req.body.username || !req.body.password) return res.send ('There is an error with your request body');

const { username, password } = req.body;

const findUser = 'SELECT username, password, firstName, lastName, email FROM users WHERE username = $1 AND password = $2';

const where = [username, password];

const container = {};
db.query(findUser, where)

 .then((data) => {
    // console.log("sam is here")
    // console.log(data)
    // if (data) console.log('got data')
// if (!data) console.log("green")
 })
.catch ((err) => {
console.log(err)
})
///data

},



//add themselves -> login -> verify -> session ID

// what is the point of the session vs the session id cookie? 

// create SSID cookie equal to UN plus random number when a user signs up

setSSIDCookie (req, res, next) {
const secret = Math.floor(Math.random()*100);
res.cookie('ssid', secret, {httpOnly: true});
 return next();
}




}


///success!! 


    


module.exports = authController;