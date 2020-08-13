const express = require('express');


function createUserByEmail(db) {
  const router = express.Router();
router.get('/useremail/:email', function (req, res, next) {
    db.query(
        'SELECT * FROM customer WHERE email=?',
       [req.params.email],
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

module.exports = createUserByEmail;