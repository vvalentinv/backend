const express = require('express');

function createManagerItem(db) {
const router = express.Router();

router.get('/manageritem', function (req, res, next) {
  db.query(
    'SELECT restaurant.restaurantID, restaurant.name, restaurant.email , menu.menuID, menu.menuName, section.sectionID, section.sectionName, item.itemID, item.itemName,item.itemDescription, item.measurementUnit, item.size, item.itemPrice FROM manager JOIN restaurant USING(restaurantID) JOIN menu Using(restaurantID) JOIN section USING (menuID) JOIN item USING (sectionID)',
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

router.get('/manageritem/:email', function (req, res, next) {
    db.query(
      'SELECT restaurant.restaurantID, restaurant.name, restaurant.email , menu.menuID, menu.menuName, section.sectionID, section.sectionName, item.itemID, item.itemName,item.itemDescription, item.measurementUnit, item.size, item.itemPrice FROM manager JOIN restaurant USING(restaurantID) JOIN menu Using(restaurantID) JOIN section USING (menuID) JOIN item USING (sectionID) WHERE manager.email = ?',
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
module.exports=createManagerItem;