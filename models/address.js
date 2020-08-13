const express = require('express');

function createAddress(db) {
const router = express.Router();

router.get('/address/:id', function (req, res, next) {
    db.query(
      'SELECT * FROM address WHERE addressID=?',
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
module.exports=createAddress;