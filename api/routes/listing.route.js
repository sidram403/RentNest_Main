import express from 'express';
import { createListing, getListing, getListings } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();


router.post('/create', createListing);
router.get('/list/:id', getListing)
router.get('/get', getListings)

export default router