const express = require('express');

function createNote(db) {
  const router = express.Router();
  router.post('/note', function (req, res, next) {
    db.query(
        'INSERT INTO note ( customerID, description, restaurantID) VALUES (?,?,?)',
        [ req.body.customerID,req.body.description, req.body.restaurantID],
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
  router.get('/note', function (req, res, next) {
    db.query(
        'SELECT * FROM note',
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

  router.get('/note/:id', function (req, res, next) {
    db.query(
        'SELECT * FROM note WHERE noteID=?',
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

 

  router.put('/note/:id', function (req, res, next) {
    db.query(
      'UPDATE note SET description=? WHERE noteID=?',
      [req.body.description, req.params.id],
      (error, results) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({results});
        }
      }
    );
  });
  // the routes are defined here
router.delete('/note/:id',function(req,res,next){
  db.query(
    'DELETE FROM note WHERE noteID=?',
    [req.params.id],
    (error) => {
      if (error) {
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json({status: 'ok'});
      }
    }
  );
});
  return router;
}

module.exports = createNote;