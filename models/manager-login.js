// require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

function logManager(db) {
  const router = express.Router();
  router.post('/login-manager', function (req, res, next) {
    
	var loginUsername=req.body.email;
	var storedLogin='';
	
	var loginPassword=req.body.password;
    // find the email address in the customers table
	// if it is there hash the passed password and compare with stored hash
	// bcrypt.compare(loginPassword,storedHash).then((res) => {
	//	if (res === true)// passwords match
	
	
	if(loginUsername&&loginPassword){
    db.query(
        'SELECT * FROM manager WHERE email=?', [loginUsername],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
			if (results){
				//user exists; retrieved stored hash
				
				bcrypt.compare(loginPassword,results[0].password,function(err, result) {
					if(result) {
						// var payload = {
							// email : loginUsername							
						// }
						// var token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
						// console.log(token);
						// console.log(result);
						res.status(200).json({'message':"Yay"});//,token});
						
					}
					else {
						return res.status(400).send({ message: "Invalid Password" });
					}
        });
			}else{
				console.log(error);
				res.status(500).json({status: 'error'});//ivalid username
			}
        }
      }
    )
    }
  });
  return router;
}
module.exports = logManager;