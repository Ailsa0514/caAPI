const express = require('express')
const router = express.Router();


//引入控制器
const iconController = require("../controller/iconController")
router.route('/')
        .get(iconController.index)
        .post(iconController.upIcon)

module.exports = router