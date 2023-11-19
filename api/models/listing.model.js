import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    resourceId: {
      type: String,
      required: true,
    },
    timestamps:{
      type: String,
      required: true,
    },
    tracedId : {
      type: String,
      required:true,
    },
    spanId:{
      type:String,
      required:true,
    },
    commit : {
      type: String,
      required: true,
    },
    metadata: {
      type: Object,
    },
    parentId:{
      type: String,
    }

    
    
  },
  { timestamps: true }
);

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;