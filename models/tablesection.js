const express = require('express');

function createTableSection(db) {
  const router = express.Router();
  router.post('/tablesection', function (req, res, next) {
    db.query(
        'INSERT INTO tablesection ( tableSectionName, description, restaurantID) VALUES (?,?,?)',
        [ req.body.tableSectionName,req.body.description, req.body.restaurantID],
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
  router.get('/tablesection', function (req, res, next) {
    db.query(
        'SELECT * FROM tablesection',
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

  router.get('/tablesection/:id', function (req, res, next) {
    db.query(
        'SELECT * FROM tablesection WHERE restaurantID=?',[req.params.id],
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

module.exports = createTableSection;