const express = require('express');

function createManagerSection(db) {
const router = express.Router();

router.get('/managersection', function (req, res, next) {
    db.query(
        'SELECT section.sectionID, section.sectionName FROM manager JOIN restaurant USING(restaurantID) JOIN menu Using(restaurantID) JOIN section USING (menuID)',
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
router.get('/managersection/:email', function (req, res, next) {
    db.query(
      'SELECT section.sectionID, section.sectionName FROM manager JOIN restaurant USING(restaurantID) JOIN menu Using(restaurantID) JOIN section USING (menuID) WHERE manager.email = ?',
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
module.exports=createManagerSection;