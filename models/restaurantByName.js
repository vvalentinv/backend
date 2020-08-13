const express = require('express');

function createRestaurantByName(db) {
const router = express.Router();

router.get('/restaurantname/:name', function (req, res, next) {
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
  return router;
}

module.exports = createRestaurantByName;