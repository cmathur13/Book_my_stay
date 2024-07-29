import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

export const createHotel = async (req, res) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

export const updateHotel = async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

export const deleteHotel = async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted !");
  } catch (err) {
    next(err);
  }
};

export const getHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

export const getAllHotels = async (req, res) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min || 1, $lt: max || 9999999 },
    }).limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

// Get Count of All Hotels
export const countAll = async (req, res, next) => {
  try {
    const count = await Hotel.countDocuments();

    res.status(200).json(count);
  } catch (err) {
    next(err);
  }
};

// Get Count of Hotels of a particular City
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );

    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);

    if (!hotel.rooms || hotel.rooms.length === 0)
      return next(500, "No Room Found");

    const list = await Promise.all(
      hotel.rooms.map((room) => Room.findById(room))
    );

    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

// Get All Revenue before current Date
export const getAllHotelsRevenue = async (req, res, next) => {
  try {

    const rooms = await Room.find();

    let revenue = 0;
    rooms.forEach(room => {
      const roomPrice = room.price;
      const roomNumbersArray = room.roomNumbers;

      let bookedDates = 0;
      roomNumbersArray.forEach(roomNumber => {
        roomNumber.unavailableDates.forEach( date => {
          const currentDate = new Date().getDate();
          if(date.getDate() < currentDate){
            bookedDates++;
          }
        })
      })

      revenue = revenue + (roomPrice * bookedDates);

    })

    res.status(200).json(revenue);
  } catch (error) {
    next(error);
  }
};

// Get All Revenue for a particular month
export const getAllHotelsRevenueForAMonth = async (req, res, next) => {
  try {

    const rooms = await Room.find();
    const month = req.params.id;
    const currentYear= new Date().getFullYear();

    let revenue = 0;
    rooms.forEach(room => {
      const roomPrice = room.price;
      const roomNumbersArray = room.roomNumbers;

      let bookedDates = 0;
      roomNumbersArray.forEach(roomNumber => {
        roomNumber.unavailableDates.forEach( date => {
          
          if(date.getMonth() == month && date.getFullYear() == currentYear){
            bookedDates++;
          }
        })
      })

      revenue = revenue + (roomPrice * bookedDates);

    })

    res.status(200).json(revenue);
  } catch (error) {
    next(error);
  }
};

// export const getAllHotelsRevenue = async (req, res, next) => {
//   try {

//     const rooms = await Room.find();

//     let revenue = 0;
//     rooms.forEach(room => {
//       const roomPrice = room.price;
//       const roomNumbersArray = room.roomNumbers;

//       let bookedDates = 0;
//       roomNumbersArray.forEach(roomNumber => {
//         roomNumber.unavailableDates.forEach( date => {
//           const currentDate = new Date().getDate();
//           if(date.getDate() < currentDate){
//             bookedDates++;
//           }
//         })
//       })

//       revenue = revenue + (roomPrice * bookedDates);

//     })

//     res.status(200).json(revenue);
//   } catch (error) {
//     next(error);
//   }
// };

// GEt All Revenue for prev day
export const getAllHotelsRevenueForThisDay = async (req, res, next) => {
  try {

    const rooms = await Room.find();

    const curr_date = new Date();
    curr_date.setDate(curr_date.getDate() - 1);

    let revenue = 0;
    rooms.forEach(room => {
      const roomPrice = room.price;
      const roomNumbersArray = room.roomNumbers;

      let bookedDates = 0;
      roomNumbersArray.forEach(roomNumber => {
        roomNumber.unavailableDates.forEach( date => {
          
          if(date.getDate() == curr_date.getDate() && date.getMonth() == curr_date.getMonth() && date.getFullYear() == curr_date.getFullYear()){
            bookedDates++;
          }
        })
      })

      revenue = revenue + (roomPrice * bookedDates);

    })

    res.status(200).json(revenue);
  } catch (error) {
    next(error);
  }
};



