const express = require('express');
const bcrypt = require('bcryptjs');
const salt = 10;// between 10 and 12 rounds accepted

function createManagerEmail(db) {
  const router = express.Router();
  
  router.get('/manageremail/:email', function (req, res, next) {
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
  // the routes are defined here

  return router;
}

module.exports = createManagerEmail;