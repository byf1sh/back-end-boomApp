const prisma = require('../config/database');
const {utcHelper, utcHelperPlus} = require('../utils/utcHelper');

// Create a new review
const createReview = async (data) => {
  const { boat_id, user_id, rating, comment } = data;
  let createdAt = utcHelperPlus();
  const newReview = await prisma.review.create({
    data: {
      boat_id,
      user_id,
      rating,
      comment,
      createdAt
    }
  });
  return newReview;
};

const getReviewsByBoatId = async (boat_id) => {
  const reviews = await prisma.review.findMany({
    where: boat_id ? {
      boat_id: parseInt(boat_id),
    } : {},  // Jika boat_id tidak didefinisikan, ambil semua review
    take: 10,  // Batasi hasil yang diambil hingga 10
    orderBy: {
      createdAt: 'desc'  // Urutkan berdasarkan createdAt dari yang terbaru
    }
  });
  return reviews;
};


// Delete a review by ID
const deleteReviewById = async (id) => {
  const deletedReview = await prisma.review.delete({
    where: {
      id: parseInt(id),
    },
  });
  return deletedReview;
};

module.exports = {
  createReview,
  getReviewsByBoatId,
  deleteReviewById
};
