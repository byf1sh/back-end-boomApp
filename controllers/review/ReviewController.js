const reviewService = require('../../services/ReviewService');

// Create new review
const createReview = async (req, res) => {
  try {
    const newReview = await reviewService.createReview(req.body);
    res.status(201).json({ message: 'Review added successfully', review: newReview });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all reviews for a product
const getReviews = async (req, res) => {
  try {
    const reviews = await reviewService.getReviewsByBoatId(req.query.rsv_id);
    res.status(200).json(reviews);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete review by ID
const deleteReview = async (req, res) => {
  try {
    await reviewService.deleteReviewById(req.params.id);
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createReview,
  getReviews,
  deleteReview
};
