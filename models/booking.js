const express = require('express');

function createBooking(db) {
  const router = express.Router();
  router.post('/booking', function (req, res, next) {
    db.query(
        'INSERT INTO booking ( time, wasConsumed, restaurantID, customerID) VALUES (?,?,?,?)',
        [ req.body.time,req.body.wasConsumed, req.body.restaurantID, req.body.customerID],
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
  router.get('/booking', function (req, res, next) {
    db.query(
        'SELECT * FROM booking',
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

  router.get('/booking/:id', function (req, res, next) {
    db.query(
        'SELECT * FROM booking WHERE bookingID=?',
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

 

  router.put('/booking/:id', function (req, res, next) {
    db.query(
      'UPDATE booking SET time=?, wasConsumed=?, restaurantID=?, customerID=? WHERE bookingID=?',
      [req.body.time, req.body.wasConsumed, req.body.restaurantID,req.body.customerID, req.params.id],
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

module.exports = createBooking;