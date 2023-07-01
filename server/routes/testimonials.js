const express = require('express');
const router = express.Router();
const Testimonial = require('../models/testimonial');

//get all testimonials
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.json({ success: true, data: testimonials });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something Went Wrong' });
  }
});

//get a single testimonial
router.get('/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    res.json({ success: true, data: testimonial });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something Went Wrong' });
  }
});

//Add a room
router.post('/', async (req, res) => {
    const testimonial = new Testimonial({
      image_url: req.body.image_url,
      name: req.body.name,
      email: req.body.email,
      position: req.body.position,
      message: req.body.message,
      ratings: req.body.ratings,
 
    });
  
    try {
      const savedTestimonial = await testimonial.save();
      res.json({ success: true, data: savedTestimonial });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: 'Something Went Wrong' });
    }
  });

module.exports = router;