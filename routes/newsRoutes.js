const express = require('express');
const newsController = require('../controllers/news/NewsController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/create-news', authMiddleware,newsController.createNews);
router.get('/get-news', authMiddleware,newsController.getNews);
router.delete('/delete-news', authMiddleware, newsController.deleteNews);

module.exports = router;