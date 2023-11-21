import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};





export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found"));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req,res,next) =>{
    try {
      const limit = parseInt(req.query.limit ) || 9;
      const startIndex = parseInt(req.query.startIndex) || 0;
      
  

      const searchTerm = req.query.searchTerm || '';
      const loacationTerm = req.query.loacationTerm || '';

      const sort = req.query.sort || 'createdAt';
      
      const order = req.query.order || 'desc';

      const listings = await Listing.find({
        name:{$regex: loacationTerm, $options: 'i'},
        address: {$regex: searchTerm, $options:'i'},
        offer,
        furnished,
        parking,
        type,
      }).sort(
        {[sort]:order}
      ).limit(limit).skip(startIndex)

      return res.status(200).json(listings)


      
    } catch (error) {
      next(error);
    }
}
