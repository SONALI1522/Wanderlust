const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("../models/review.js");
const listingSchema = new Schema({//basic schema
    title : {
      type:String,
      required:true,
    },
    description:String,
    image:{
       url: String,
       filename: String,
    },
    price:Number,
    location:String,
    country:String,
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
});
listingSchema.post("findOneAndDelete", async (listing) =>{
  if(listing){
    await Review.deleteMany({_id: {$in: listing.reviews}});
  }
});
const Listing = mongoose.model("Listing",listingSchema);//creating model
module.exports = Listing;//exporting to app.js