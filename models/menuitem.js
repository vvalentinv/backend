const express = require('express');

function createMenuItem(db) {
const router = express.Router();

router.get('/item/:id', function (req, res, next) {
    db.query(
      'SELECT * FROM item WHERE sectionID=?',
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
  router.put('/item/:id', function (req, res, next) {
    db.query(
      'UPDATE item SET itemName=?, itemDescription=?, measurementUnit=?,size=?, itemPrice=?',
      [req.body.itemName, req.body.itemDescription, req.body.measurementUnit,req.body.size, req.body.itemPrice, req.params.id],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  router.post('/item', function (req, res, next) {
    db.query(
        'INSERT INTO item ( itemName, itemDescription, measurementUnit,size, itemPrice, sectionID) VALUES (?,?,?,?,?,?)',
        [ req.body.itemName,req.body.itemDescription,req.body.measurementUnit,req.body.size, req.body.itemPrice, req.body.sectionID],
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
module.exports=createMenuItem;