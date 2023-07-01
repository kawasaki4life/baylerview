const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a text field'],
  },
  description: {
    type: String,
  },
  amenities: {
    type: String,
  },
  capacity: {
    type: String,
  },
  stars: {
    type: String,
  },
  rate: {
    type: String,
  },
  image_url: {
    type: String,
  },
  room_type: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Room', RoomSchema);
