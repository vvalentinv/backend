const express = require('express');

function createDateTableDate(db) {
  const router = express.Router();
  router.get('/datetabledate', function (req, res, next) {
    db.query(
        'SELECT * FROM date_table_date',
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
    router.get('/datetabledate/:id', function (req, res, next) {
      db.query(
          'SELECT * FROM date_table_date WHERE tableID=?',
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

module.exports = createDateTableDate;