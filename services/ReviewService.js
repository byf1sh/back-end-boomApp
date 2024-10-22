const prisma = require('../config/database');
const { DateTime } = require('luxon');

// Create a new review
const createReview = async (data) => {
  const { rsv_id, user_id, rating, comment } = data;
  const createdAt = DateTime.now().setZone('utc').plus({ hours: 7 });
  const newReview = await prisma.review.create({
    data: {
      rsv_id,
      user_id,
      rating,
      comment,
      createdAt: createdAt.toISO()
    }
  });
  return newReview;
};

const getReviewsByBoatId = async (rsv_id, user_id) => {
  const reviews = await prisma.review.findMany({
    where: {
      ...(rsv_id ? { rsv_id: parseInt(rsv_id) } : {}),  // Filter berdasarkan rsv_id jika ada
      ...(user_id ? { user_id: parseInt(user_id) } : {}),  // Filter berdasarkan user_id jika ada
    },
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
