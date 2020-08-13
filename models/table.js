const express = require('express');

function createTable(db) {
  const router = express.Router();
  router.post('/table', function (req, res, next) {
    db.query(
        'INSERT INTO table1 ( capacity, tableID) VALUES (?,?)',
        [ req.body.capacity],
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
  router.get('/table', function (req, res, next) {
    db.query(
        'SELECT * FROM table1',
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

  router.get('/table/:id', function (req, res, next) {
    db.query(
        'SELECT * FROM table1 WHERE tablesectionID=?',[req.params.id],
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

module.exports = createTable;