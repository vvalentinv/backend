const express = require('express');

function createRestaurantItem(db) {
const router = express.Router();

router.get('/restaurantitem', function (req, res, next) {
  db.query(
    'SELECT restaurant.restaurantID, restaurant.name, restaurant.email , menu.menuID, menu.menuName, section.sectionID, section.sectionName, item.itemID, item.itemName,item.itemDescription, item.measurementUnit, item.size, item.itemPrice FROM restaurant JOIN menu Using(restaurantID) JOIN section USING (menuID) JOIN item USING (sectionID)',
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

router.get('/restaurantitem/:id', function (req, res, next) {
    db.query(
      'SELECT restaurant.restaurantID, restaurant.name, restaurant.email , menu.menuID, menu.menuName, section.sectionID, section.sectionName, item.itemID, item.itemName,item.itemDescription, item.measurementUnit, item.size, item.itemPrice FROM restaurant JOIN menu Using(restaurantID) JOIN section USING (menuID) JOIN item USING (sectionID) WHERE restaurantID = ?',
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
module.exports=createRestaurantItem;