const express = require('express');
const bcrypt = require('bcryptjs');
const salt = 10;// between 10 and 12 rounds accepted

function createManager(db) {
  const router = express.Router();
  var pHashed ='';
  
  router.post('/manager', function (req, res, next) {
	bcrypt.hash(req.body.password,salt).then(hash => {
		pHashed = hash;
		db.query(
			'Select * From manager Where email=?',[req.body.email],
			(error, results) => {
				if (error) {
					console.log(error);
					res.status(500).json({status: 'error'});
				} else {
					console.log(results.length);
					if(results.length > 0){
						console.log('user taken');
						//manager already registered
					}
					else{
						db.query(
						'INSERT INTO manager ( firstName, lastName, phone, email, password) VALUES (?,?,?,?,?)',
							[ req.body.firstName,req.body.lastName, req.body.phone, req.body.email,pHashed],
						(error, results) => {
							if (error) {
								console.log(error);
								res.status(500).json({status: 'error'});
							} else {
								
								//add redirect to login
								//
								res.status(200).json({ "message": "Registration successful" });
							}
						});
					}
				}
		});
	});
});		
  
  
  router.get('/manager', function (req, res, next) {
    db.query(
        'SELECT * FROM manager',
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

  router.get('/manager/:id', function (req, res, next) {
    db.query(
        'SELECT * FROM manager WHERE userID=?',
        [req.params.id],
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

  router.get('/manager/:email', function (req, res, next) {
    db.query(
      "Select manager.userID, manager.firstName, manager.lastName, manager.phone, manager.email AS 'manager_email', manager.restaurantID, restaurant.restaurantID, restaurant.name, restaurant.email AS 'restaurant_email', restaurant.restaurant_desc, restaurant.restaurant_image, address.addressID, address.addressDescription, address.postalCode, address.provinceCode, address.country FROM manager JOIN restaurant USING(restaurantID) JOIN address USING(addressID) WHERE manager.email=?"
      ,[req.params.email],
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
  router.put('/manager/:id', function (req, res, next) {
    db.query(
      'UPDATE manager SET firstName=?, lastName=?, phone=?, email=?, password=? WHERE userID=?',
      [req.body.firstName, req.body.lastName, req.body.phone,req.body.email,req.body.password, req.params.id],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });
  // the routes are defined here

  return router;
}

module.exports = createManager;