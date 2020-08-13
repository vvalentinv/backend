const express = require('express');
const bcrypt = require('bcryptjs');

function createUser(db) {
  const router = express.Router();
  var pHashed ='';
  
  
  router.post('/user', function (req, res, next) {
	bcrypt.hash(req.body.password,10).then(hash => {
		pHashed = hash;
		db.query(
			'Select * From customer Where email=?',[req.body.email],
			(error, results) => {
				if (error) {
					console.log(error);
					res.status(500).json({status: 'error'});
				} else {
					console.log(results.length);
					if(results.length > 0){
						console.log('user taken');
						//user already registered
					}
					else{
						db.query(
						'INSERT INTO customer ( firstName, lastName, phone, email, password) VALUES (?,?,?,?,?)',
							[ req.body.firstName,req.body.lastName, req.body.phone, req.body.email,pHashed],
						(error, results) => {
							if (error) {
								console.log(error);
								res.status(500).json({status: 'error'});
							} else {
								res.status(200).json(results);
							}
						});
					}
				}
		});
	});
});		
 

  router.get('/user', function (req, res, next) {
    db.query(
        'SELECT userID, firstName, lastName, phone, email, password FROM customer',
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  router.get('/user/:id', function (req, res, next) {
    db.query(
        'SELECT * FROM customer WHERE userID=?',[req.params.id],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  
  router.put('/user/:id', function (req, res, next) {
    db.query(
      'UPDATE customer SET firstName=?, lastName=?, phone=?, email=? WHERE userID=?',
      [req.body.firstName, req.body.lastName, req.body.phone,req.body.email, req.params.id],
      (error,results) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
          console.log(results)
        }
      }
    );
  });

  
  // the routes are defined here

  return router;
}

module.exports = createUser;