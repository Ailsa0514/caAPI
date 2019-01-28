const express = require('express');
const router = express.Router();

const clothesController = require('../controller/clothController')
router.route('/')
       .get (clothesController.index)
       .post(clothesController.newClothes)

router.route('/:id')
       .get (clothesController.getClothes)

module.exports = router