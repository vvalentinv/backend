const express = require('express');

function createRestaurant(db) {
const router = express.Router();

  router.get('/restaurant', function (req, res, next) {
    db.query(
      'SELECT * FROM restaurant',
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
  /*router.get('/restaurant/:name', function (req, res, next) {
    db.query(
        'SELECT * FROM restaurant WHERE name=?',
        [req.params.name],
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
  */
  router.post('/restaurant', function (req, res, next) {
    db.query(
        'INSERT INTO restaurant (name, email,addressID, ownerID, managerID,restaurant_desc, restaurant_image) VALUES (?,?,?,?,?,?,?)',
        [ req.body.name,req.body.email, req.body.addressID, req.body.ownerID, req.body.managerID,req.body.restaurant_desc, req.body.restaurant_image],
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

  router.put('/restaurant/:id', function (req, res, next) {
    db.query(
      'UPDATE restaurant SET name=?, email=? restaurant_desc=?, restaurant_image=? WHERE restaurantID=?',
      [req.body.name, req.body.email, req.body.restaurant_desc, req.body.restaurant_image, req.params.id],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  router.get('/restaurant/:id', function (req, res, next) {
    db.query(
        'SELECT * FROM restaurant WHERE restaurantID=?',
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
  
  // the routes are defined here

  return router;
}

module.exports = createRestaurant;