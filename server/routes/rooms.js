const express = require('express');
const router = express.Router();
const Room = require('../models/room');

//get all rooms
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json({ success: true, data: rooms });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something Went Wrong' });
  }
});

//get a single room
router.get('/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    res.json({ success: true, data: room });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something Went Wrong' });
  }
});

//Add a room
router.post('/', async (req, res) => {
    const room = new Room({
      image_url: req.body.image_url,
      name: req.body.name,
      description: req.body.description,
      amenities: req.body.amenities,
      capacity: req.body.capacity,
      stars: req.body.stars,
      rate: req.body.rate,
      room_type: req.body.room_type,
    });
  
    try {
      const savedRoom = await room.save();
      res.json({ success: true, data: savedRoom });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: 'Something Went Wrong' });
    }
  });

module.exports = router;