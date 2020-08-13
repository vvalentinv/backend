const express = require('express');

function createSection(db) {
const router = express.Router();

router.get('/section/:id', function (req, res, next) {
    db.query(
      'SELECT * FROM section WHERE menuID=?',
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

  router.put('/section/:id', function (req, res, next) {
    db.query(
      'UPDATE section SET sectionName=? WHERE sectionID=?',
      [req.body.sectionName, req.params.id],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  router.post('/section', function (req, res, next) {
    db.query(
        'INSERT INTO section ( sectionName, menuID) VALUES (?,?)',
        [ req.body.sectionName,req.body.menuID],
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
module.exports=createSection;