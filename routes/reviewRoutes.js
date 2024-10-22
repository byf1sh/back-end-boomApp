const express = require('express');
const reviewController = require('../controllers/review/ReviewController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/create', authMiddleware, reviewController.createReview);
router.get('/get-reviews', authMiddleware, reviewController.getReviews);
router.delete('/delete/:id', authMiddleware, reviewController.deleteReview);

module.exports = router;
