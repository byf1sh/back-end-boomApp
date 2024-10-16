const { handleError } = require('../../utils/errorHandler');
const newsService = require('../../services/NewsService');
const logger = require('../../utils/logger');
const { utcHelper } = require('../../utils/utcHelper');

exports.createNews = async (req, res) => {
    const {url_foto, title, location, content} = req.body;
    try{
        const news = await newsService.createNews(url_foto, title, location, content);
        res.status(201).json({ message: 'News created successfully', news });
    } catch (e) {
        handleError(e, res);
    }
};

exports.getNews = async (req, res) => {
    try{
        const getNews = await newsService.getNews();
        res.status(200).json({ message: getNews });
    } catch (e) {
        handleError(e, res);
    }
};

exports.deleteNews = async (req, res) => {
    const {id} = req.body;
    try{
        const deleteNews = await newsService.deleteNews(id);
        res.status(200).json({ message: 'News deleted successfully', deleteNews });
    } catch (e) {
        handleError(e, res);
    }
};