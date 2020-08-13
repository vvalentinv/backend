const express = require('express');

function createCustomerBooking(db) {
  const router = express.Router();
router.get('/customerbooking/:id', function (req, res, next) {
    db.query(
        'SELECT * FROM booking WHERE customerID=?',
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
  router.get('/customerbooking/history/:id',function(req,res,next){
    db.query(
      'SELECT booking.customerID, restaurant.restaurantID, restaurant.name AS rest_name, restaurant.email , restaurant.restaurant_desc, booking.restaurantID,booking.wasConsumed, booking.time FROM restaurant JOIN booking USING(restaurantID) WHERE customerID=?',[req.params.id],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
      )
  })
  return router;
}

module.exports = createCustomerBooking;