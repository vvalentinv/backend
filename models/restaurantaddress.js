const express = require('express');

function createRestaurantAddress(db) {
const router = express.Router();

router.get('/restaurantaddress', function (req, res, next) {
    db.query(
        'SELECT restaurant.restaurantID, restaurant.name, restaurant.email, restaurant.restaurant_desc, restaurant.restaurant_image, address.addressID, address.addressDescription, address.postalCode, address.provinceCode, address.country FROM restaurant JOIN address Using(addressID)',
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

router.get('/restaurantaddress/:id', function (req, res, next) {
    db.query(
      'SELECT restaurant.restaurantID, restaurant.name, restaurant.email , address.addressID, address.addressDescription, address.postalCode, address.provinceCode, address.country FROM restaurant JOIN address Using(addressID) WHERE restaurantID = ?',
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
  return router;
}
module.exports=createRestaurantAddress;