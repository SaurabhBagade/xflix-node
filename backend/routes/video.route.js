const express = require('express')
const router = express.Router()
const videoController = require("../controllers/video.controller")
const validate = require("../middlewares/validate")
const videoValidations = require("../validations/video.validation")
const splitGenre = require("../middlewares/splitGenre")

router.get("/", splitGenre,
    validate(videoValidations.getVideos),
    videoController.getVideos)
router.get("/:videoId", validate(videoValidations.getVideoById), videoController.getVideoById)
router.patch("/:videoId/votes",
    // validate(videoValidations.updateVotes), 
    videoController.updateVotes)
router.patch("/:videoId/views",
    // validate(videoValidations.updateViews), 
    videoController.updateViews)
router.post("/", validate(videoValidations.addVideo), videoController.addVideo)
module.exports = router