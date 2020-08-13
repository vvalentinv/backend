const express = require('express');

function createHost(db) {
  const router = express.Router();
  router.post('/host', function (req, res, next) {
    db.query(
        'INSERT INTO host ( firstName, lastName, phone, email, password, managerID) VALUES (?,?,?,?,?,?)',
        [ req.body.firstName,req.body.lastName, req.body.phone, req.body.email,req.body.password, req.body.managerID],
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
  router.get('/host', function (req, res, next) {
    db.query(
        'SELECT * FROM host',
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

  router.get('/host/:id', function (req, res, next) {
    db.query(
        'SELECT * FROM host WHERE userID=?',
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

  router.put('/host/:id', function (req, res, next) {
    db.query(
      'UPDATE manager SET firstName=?, lastName=?, phone=?, email=?, password=? WHERE userID=?',
      [req.body.firstName, req.body.lastName, req.body.phone,req.body.email,req.body.password, req.params.id],
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

module.exports = createHost;