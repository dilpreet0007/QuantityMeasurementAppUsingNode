const express = require('express');

const {
    convertQuantity,
    addQuantity,
    subtractQuantity,
    getAllHistory
} = require('../controllers/quantityController');

const router = express.Router();

router.post('/convert', convertQuantity);
router.post('/add', addQuantity);
router.post('/subtract', subtractQuantity);
router.get('/history', getAllHistory);

module.exports = router;