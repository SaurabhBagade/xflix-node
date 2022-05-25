const mongoose = require('mongoose');

const utils = require("../utils/videoUtils")

const videoSchema = mongoose.Schema({
    videoLink: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    genre: {
        type: String,
        required: true,
        validate(value) {
            if (!utils.bigGenre.includes(value)) {
                throw new Error("Invalid Genre")
            }
        }
    },
    contentRating: {
        type: String,
        required: true,
        validate(value) {
            if (!utils.contentRating.includes(value)) {
                throw new Error("Invalid content rating")
            }
        }
    },
    releaseDate: {
        type: String,
        required: true,
        trim: true
    },
    previewImage: {
        type: String,
        trim: true,
        default: "https://i.ibb.co/nbYsmJB/Xflix.jpg"
    },
    viewCount: {
        type: Number,
        default: 0
    },
    votes: {
        upVotes: {
            type: Number,
            default: 0
        },
        downVotes: {
            type: Number,
            default: 0
        }
    }
})



const Video = mongoose.model("Video", videoSchema)


module.exports = {
    Video
}