const express = require('express');
const FetchAvailableBoatController = require('../controllers/boat/FetchAvailableBoatController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/available-boats', authMiddleware, FetchAvailableBoatController.fetchAvailBoats);

module.exports = router;
