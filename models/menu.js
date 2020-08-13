const express = require('express');

function createMenu(db) {
const router = express.Router();

router.get('/menu/:id', function (req, res, next) {
    db.query(
      'SELECT * FROM menu WHERE restaurantID=?',
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

  router.put('/menu/:id', function (req, res, next) {
    db.query(
      'UPDATE menu SET menuName=? WHERE menuID=?',
      [req.body.menuName, req.params.id],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  router.post('/menu', function (req, res, next) {
    db.query(
        'INSERT INTO menu ( menuName, restaurantID) VALUES (?,?)',
        [ req.body.menuName,req.body.restaurantID],
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
module.exports=createMenu;