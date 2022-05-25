const { Video } = require("../models/video.model")
const ApiError = require("../utils/ApiError")

const getAllVideos = async () => {
    const videos = await Video.find()
    return videos
};

const getVideoById = async (Id) => {
    const video = await Video.findById(Id)
    if (!video) {
        throw new ApiError(400, "No video found with matching id")
    }
    return video
}

const changeViews = async (id) => {
    const video = await getVideoById(id)
    video.viewCount += 1
    await video.save()
}

const changeVotes = async (id, voteType, changeType) => {

    const video = await getVideoById(id)
    let changeVoteType = ''
    if (voteType === "upVote") {
        changeVoteType = "upVote"
    } else {
        changeVoteType = "downVote"
    }
    const prevVotes = video.votes[changeVoteType]
    let newVotes = prevVotes

    if (changeType === "increase") {
        newVotes += 1
    } else {
        newVotes -= 1
    }
    newVote = Math.max(newVotes, 0)
    video.votes[changeVoteType] = newVotes
    await video.save()
    return
}
const addVideo = async (data) => {
    const video = await Video.create(data)
    return video
}

module.exports = {
    getAllVideos,
    getVideoById,
    changeViews,
    changeVotes,
    addVideo
}