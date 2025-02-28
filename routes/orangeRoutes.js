const express = require('express');
const router = express.Router();
const orangeController = require('../controllers/orangeController');

router.get('/', orangeController.getAllOranges);
router.post('/', orangeController.createOrange);

module.exports = router;
