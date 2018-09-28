var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var burger = require("../models/burger.js");


router.get('/', (req, res) => {
  burger.all(data => {
    let hbsBurgers = {
      burgers: data
    }
    console.log(hbsBurgers);
    res.render('index', hbsBurgers);
  });

  router.post('/burger/create', (req, res) => {
    let burgerName = req.body.addBurger
    burger.create(['burger_name'], [burgerName], () => {
      res.redirect('/');
    })
  });

  router.post('/burgers/:id', (req, res) => {
    var condition = "id = " + req.params.id;
    console.log(condition, 'CHECK THE CONDITION');
    burger.update({
      devoured: true
    }, condition, () => {
      res.redirect('/');
    })
  });

  router.post('/delete/:id', (req, res) => {
    var condition = "id = " + req.params.id;
    burger.delete(
    condition, () => {
      res.redirect('/');
    })
  });

});

module.exports = router;