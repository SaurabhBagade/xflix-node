const Joi = require("joi");
const utils = require("../utils/videoUtils")
Joi.objectId = require('joi-objectid')(Joi)

const addVideo = {
    body: Joi.object().keys({
        videoLink: Joi.string().required().regex(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/),
        genre: Joi.string().required().valid("Education", "Sports", "Movies", "Comedy", "Lifestyle", "All"),
        contentRating: Joi.string().required().valid(...utils.contentRating, "All"),
        title: Joi.string().required(),
        previewImage: Joi.string().required(),
        releaseDate: Joi.string().required()
    })
}

const getVideos = {
    query: Joi.object().keys({
        title: Joi.string(),
        genres: Joi.array().items(Joi.string().valid(...utils.genre, "all")),
        contentRating: Joi.string().valid(...utils.contentRating, "all"),
        sortBy: Joi.string().valid(...utils.sortBy)
    })
}

const getVideoById = {
    params: Joi.object().keys({
        videoId: Joi.objectId()
    })
}

const postVideo = {
    body: Joi.object().keys({
        videoLink: Joi.string().required(),
        title: Joi.string().required(),
        genre: Joi.string().valid().required()
    })
}

const updateViews = {
    params: Joi.object().keys({
        videoId: Joi.objectId().required()
    }),
    body: Joi.object().keys({
        vote: Joi.string().required().valid(...utils.updateVoteTypes),
        change: Joi.string().required().valid(...utils.changeVoteTypes)
    })
}

const updateVotes = {
    params: Joi.object().keys({
        videoId: Joi.objectId().required()
    }),
    body: Joi.object().keys({
        vote: Joi.string().required().valid(...utils.updateVoteTypes),
        change: Joi.string().required().valid(...utils.changeVoteTypes)
    })
}


module.exports = {
    getVideos,
    postVideo,
    getVideoById,
    updateViews,
    updateVotes,
    addVideo
}