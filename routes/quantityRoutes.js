const express = require('express');

const {
    compareQuantity,
    convertQuantity,
    addQuantity,
    addQuantityWithTargetUnit,
    subtractQuantity,
    subtractQuantityWithTargetUnit,
    divideQuantity,
    getAllHistory,
    getHistoryByOperation,
    getHistoryByType,
    getCountByOperation,
    getErroredOperations
} = require('../controllers/quantityController');

const router = express.Router();

router.post('/compare', compareQuantity);

router.post('/convert', convertQuantity);

router.post('/add', addQuantity);

router.post('/add-with-target-unit', addQuantityWithTargetUnit);

router.post('/subtract', subtractQuantity);

router.post('/subtract-with-target-unit', subtractQuantityWithTargetUnit);

router.post('/divide', divideQuantity);

router.get('/history', getAllHistory);

router.get('/history/operation/:operation', getHistoryByOperation);

router.get('/history/type/:type', getHistoryByType);

router.get('/count/:operation', getCountByOperation);

router.get('/history/errored', getErroredOperations);

module.exports = router;