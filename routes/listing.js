const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage })

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
     isLoggedIn,
     upload.single('listing[image]'),
     validateListing,
     wrapAsync(listingController.createdListing)
  );
//new route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//search route
router.get("/search", async (req, res) => {
    try {
        const { city, country } = req.query;
        let query = {};

        // Match location (instead of city)
        if (city) {
            query.location = { $regex: city, $options: "i" }; // partial & case-insensitive search
        }

        // Match country
        if (country) {
            query.country = { $regex: country, $options: "i" };
        }

        console.log("Query params received:", req.query);
        console.log("MongoDB Query Object:", query);

        const allListings = await Listing.find(query);
        console.log("Results Found:", allListings.length);

        res.render("listings/index.ejs", { allListings });
    } catch (err) {
        console.log("Error during search:", err);
        req.flash("error", "Something went wrong!");
        res.redirect("/listings");
    }
});



//category route
router.get("/category/:category", async (req, res) => {
  const { category } = req.params;
  const allListings = await Listing.find({ category: category });
  res.render("listings/index.ejs", { allListings });
});

router.route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
  isLoggedIn,
  isOwner,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.updateListing)
  )
  .delete(
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.destroyListing)
  );

//Edit route
router.get("/:id/edit", 
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);
module.exports = router;