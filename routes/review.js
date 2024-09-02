const express = require("express");
const Router =express.Router({ mergeParams: true});
const wrapAsync= require("../utils/wrapAsync.js");

const ExpressError =require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview,isLoggedIn,isReviewAuthor}=require("../middleware.js");
const reviewController=require("../controllers/reviews.js");
const review=require("../models/review.js");

Router.post("/", isLoggedIn,validateReview,wrapAsync(reviewController.createReview));

// post reviews Delete route 

Router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports=Router;