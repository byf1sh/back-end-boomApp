const prisma = require('../config/database');
const logger = require('../utils/logger');
const { DateTime } = require('luxon');
const {utcHelper, utcHelperPlus} = require('../utils/utcHelper');

exports.createNews = async (url_foto, title, location, content) => {
    try{
        return await prisma.news.create({
            data: {
                url_foto,
                title,
                location,
                content,
            },
        });
    } catch (e) {
        throw new Error(e.message);
    }
};

exports.getNews = async () => {
    try{
        return await prisma.news.findMany();
    } catch (e) {
        throw new Error(e.message);
    }
};

exports.deleteNews = async (id) => {
    try{
        return await prisma.news.delete({
            where: {
                id: id,
            },
        });
    } catch (e) {
        throw new Error('Could not delete news')
    }
};