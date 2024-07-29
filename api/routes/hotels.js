import express from "express";
import { countAll, countByCity, countByType, createHotel, deleteHotel, getAllHotels, getAllHotelsRevenue, getAllHotelsRevenueForAMonth, getAllHotelsRevenueForThisDay, getHotel, getHotelRooms, updateHotel } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// Create
router.post("/", verifyAdmin, createHotel);

// Update
router.put("/:id", verifyAdmin, updateHotel);

// Delete
router.delete("/:id", verifyAdmin, deleteHotel);

// Read

// Get 1
router.get("/find/:id", getHotel);

// Get All
router.get("/", getAllHotels);

// By City
router.get("/countByCity", countByCity);

// By Type
router.get("/countByType", countByType);

// Get rooms for a particular Hotel
router.get("/rooms/:id", getHotelRooms)

// Get count of all Hotels
router.get("/countAll", countAll);

// Get Revenue
router.get("/revenue", getAllHotelsRevenue);

// GEt Reevenue for this day
router.get("/revenue/current", getAllHotelsRevenueForThisDay);

// Get Revenue by Month
router.get("/revenue/:id", getAllHotelsRevenueForAMonth);









export default router;
