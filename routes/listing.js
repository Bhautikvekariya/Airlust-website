const express =require("express");
const router = express.Router();
const wrapAsync= require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing}= require("../middleware.js");
const ExpressError =require("../utils/ExpressError.js");
const listingController=require("../controllers/listings.js");
const multer  = require('multer')
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage});
// const middleware=require("../middleware.js");

router.route("/")
// index route 
.get(wrapAsync(listingController.index))

.post(isLoggedIn,upload.single("listing[image]"), validateListing,  wrapAsync(listingController.createListing));

  
// .post((req,res)=>{
//     res.send(req.body); 
// })

// new route
router.get("/new",isLoggedIn, listingController.listingNewForm);

router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(validateListing,isOwner, isLoggedIn,upload.single("listing[image]"), isOwner, wrapAsync(listingController.updateListing))
.delete( isLoggedIn,isOwner, wrapAsync(listingController.destroyListing));

// show route 
// router.get("/:id",wrapAsync(listingController.showListing));



//create route
// router.post("/",isLoggedIn,validateListing,wrapAsync(listingController.createListing));

//Edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

//Update route
// router.put("/:id",validateListing, isLoggedIn,isOwner, wrapAsync(listingController.updateListing));

//Delete route
// router.delete("/:id", isLoggedIn,isOwner, wrapAsync(listingController.destroyListing));

module.exports=router;


// index route 
// router.get("/:id", async (req, res) => {
    //     const { id } = req.params;
    //     const listing = await Listing.findById(id).populate("reviews");
    //     res.render("listings/show.ejs", { listing });
    // });
    // // new route
    // router.get("/new",isLoggedIn,(req, res) => {
        
        //     res.render("listings/new.ejs");
        // });
        
        // // show route 
        // router.get("/:id",wrapAsync(async(req, res) => {
        //     const { id } = req.params;
        //     const listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
        //     if(!listing){
        //         req.flash("error","Listing you requested does not exist!");
        //         res.redirect("/listings");
        //     }
        //     console.log(listing);
    //     res.render("listings/show.ejs", { listing });
    // }));
    
    // //create route
    // router.post("/",isLoggedIn,validateListing,wrapAsync(async (req, res,next) => {
        
    //     // const {title,description,price,Location,country}=req.body;
    //     const newListing = new Listing(req.body.listing);
    //     newListing.owner = req.user._id;
    //     await newListing.save();
    //     req.flash("success","New Listing created!");
    //     res.redirect("/listings");
    // })
    // );
    
    // //Edit route
    // router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(async (req, res) => {
        //     const { id } = req.params;
        //     const listing = await Listing.findById(id);
        //     if(!listing){
            //         req.flash("error","Listing you requested does not exist!");
            //         res.redirect("/listings");
            //     }
            //     res.render("listings/edit.ejs", { listing });
            // }));
            // //Update route
            // router.put("/:id",validateListing, isLoggedIn,isOwner, wrapAsync(async (req, res) => {
                //     let {id}=req.params;
                //     let updateListing= await Listing.findByIdAndUpdate(id, { ...req.body.listing });
                //     console.log(updateListing);
            //     req.flash("success","Listing Updated!");
            //     res.redirect(`/listings/${id}`);
            // }));
            
            
            // //Delete route
            // router.delete("/:id", isLoggedIn,isOwner, wrapAsync(async (req, res) => {
            //     const { id } = req.params;
            //     const deletedListing = await Listing.findByIdAndDelete(id);
            //     console.log(deletedListing);
            //     req.flash("success","Listing Deleted!");
            //     res.redirect(`/listings`);
            // }));
            
            
            
    
            
    
            
    
            
            





    // router
    // .get("/",wrapAsync(async (req, res) => {
    //     const allListings = await Listing.find({});
    //     res.render("listings/index.ejs", { allListings })
    // }));