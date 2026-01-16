import express from "express";
import ReviewCtrl from "./reviews.controller.js";

const router = express.Router();

router.route("/movie/:id").get(ReviewCtrl.apiGetReviews);
router.route("/new").post(ReviewCtrl.apiPostReview);
router.route("/:id")
    .put(ReviewCtrl.apiUpdateReview)
    .get(ReviewCtrl.apiGetReview)
    .delete(ReviewCtrl.apiDeleteReview)

export default router;