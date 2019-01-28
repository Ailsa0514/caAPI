const express = require('express');
const router = express.Router();
const carController = require('../controller/carController');
const {validateBody,schemas} = require("../helpers/routerValidate")
router.route('/')
    .get(carController.index)   
    .post(carController.newCar)

router.route('/:id')
    .get(carController.getCar)   
module.exports = router;