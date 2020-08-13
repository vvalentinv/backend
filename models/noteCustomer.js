const express = require('express');

function createCustomerNote(db) {
  const router = express.Router();
  router.get('/notecustomer/:id', function (req, res, next) {
    db.query(
        'SELECT * FROM note JOIN restaurant USING(restaurantID) WHERE customerID=?',
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

module.exports = createCustomerNote;