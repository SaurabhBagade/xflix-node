const videoService = require("../services/video.service")
const utils = require("../utils/videoUtils")
const catchAsync = require("../utils/catchAsync")
const { Video } = require("../models/video.model")
const ApiError = require("../utils/ApiError")

const getVideos = catchAsync(async (req, res) => {
    const { title, genres, contentRating, sortBy } = req.query

    let videos = await videoService.getAllVideos()

    if (title && title !== "") {
        videos = videos.filter(obj => obj.title.toLowerCase().includes(title.toLowerCase()))
    }

    if (genres && genres !== "" && !genres.includes("all")) {
        videos = videos.filter(video => genres.includes(video.genre.toLowerCase()))
    }

    if (contentRating != null && contentRating !== "" && contentRating !== "Anyone") {
        const rating = decodeURI(contentRating)
        videos = videos.filter((video) => { return parseInt(video.contentRating) >= parseInt(rating) })
    }

    if (sortBy) {
        if (sortBy === "viewCount") {
            videos = videos.sort((a, b) => a.viewCount - b.viewCount)
        } else {
            videos = videos.sort((a, b) => {
                const date1 = new Date(a.releaseDate)
                const date2 = new Date(b.releaseDate)
                return date2 - date1
            })
        }
        // const sortBy= ["viewCount", "releaseDate"]
    }
    return res.status(200).json({ "videos": videos })
})


// const changeVotes = catchAsync(async(req, res)=>{
//     const video = await videoService.changeVotes(req.params.videoId, req.body.vote, req.body.change)
//     return res.status(204).send()
// })
const updateVotes = async (req, res) => {
    try {
        const { vote, change } = req.body;
        const video = await Video.findById(req.params.videoId);
        if (!video) {
            return new ApiError(400, `No video was found with this id`);
        }
        let changeVoteType = "";
        if (vote === "upVote") {
            changeVoteType = "upVotes"
        }
        else {
            changeVoteType = "downVotes"
        }
        const prevVotes = video.votes[changeVoteType];
        let newVotes = prevVotes;
        if (change === "increase") {
            newVotes += 1;
        }
        else {
            newVotes -= 1;
        }
        newVotes = Math.max(newVotes, 0);
        video.votes[changeVoteType] = newVotes;
        await video.save();
        res.status(204).json({ "video": video })
    } catch (error) {
        res.status(500).send(error)
    }
}


// const changeViews = catchAsync(async(req, res)=>{
//     await videoService.changeViews(req.params.videoId)
//     return res.status(204).send()
// })
const updateViews = async (req, res) => {
    try {
        const video = await Video.findById(req.params.videoId);
        if (!video) {
            return new ApiError(400, "Video Not Found");
        }
        video.viewCount += 1;
        await video.save();
        res.status(204).json({ "video": video });
    } catch (error) {
        res.status(500).send(error)
    }
}

const getVideoById = catchAsync(async (req, res) => {
    const { videoId } = req.params
    const video = await videoService.getVideoById(videoId)
    return res.json(video)
})

const addVideo = catchAsync(async (req, res) => {
    const videoData = req.body
    const newVideo = await videoService.addVideo(videoData)
    return res.status(201).json(newVideo)
})

module.exports = {
    getVideos,
    getVideoById,
    updateVotes,
    updateViews,
    addVideo
}