const express = require('express');
const Car = require('../models/Car');
const router = express.Router();

// Create a new car (no authentication required)
router.post('/', async (req, res) => {
  const { name, pricePerDay, year, color, steeringType, numberOfSeats } = req.body;

  try {
    const newCar = new Car({
      name, 
      pricePerDay,
      year,
      color, 
      steeringType,
      numberOfSeats
    });

    await newCar.save();
    res.status(201).json(newCar);
  } catch (err) {
    res.status(400).json({ message: 'Error adding car', error: err });
  }
});

// Get all cars (no authentication required)
router.get('/get', async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching cars', error: err });
  }
});

// Get all cars sorted by price (lowest to highest) with post and get methods: 
router.post('/rental-cars-1', async (req, res) => {
    try {
      // The filtering: 
      const { year, color, steeringType, numberOfSeats } = req.body;
      const filterCriteria = {};

      if (year) {
        filterCriteria.year = year; 
      }
      if (color) {
        filterCriteria.color = color; 
      }
      if (steeringType) {
        filterCriteria.steeringType = steeringType; 
      }
      if (numberOfSeats) {
        filterCriteria.numberOfSeats = numberOfSeats;
      }
  
      // Fetching cars based on pricePerDay
      const cars = await Car.find(filterCriteria).sort({ pricePerDay: 1 });
  
      res.status(200).json(cars);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching cars', error: err });
    }
  });
;

router.get('/rental-cars-2', async (req, res) => {
    try {
      // The filtering:
      const { year, color, steeringType, numberOfSeats } = req.query;
      const filterCriteria = {};
 
      if (year) {
        filterCriteria.year = year;
      }
      if (color) {
        filterCriteria.color = color; 
      }
      if (steeringType) {
        filterCriteria.steeringType = steeringType; 
      }
      if (numberOfSeats) {
        filterCriteria.numberOfSeats = numberOfSeats; 
      }
  
      // Fetching cars based on pricePerDay
      const cars = await Car.find(filterCriteria).sort({ pricePerDay: 1 });
  
      res.status(200).json(cars);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching cars', error: err });
    }
  });
  
  
// Get a single car by ID (no authentication required)
router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.status(200).json(car);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching car', error: err });
  }
});

// Update a car (no authentication required)
router.put('/:id', async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    if (!updatedCar) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.status(200).json(updatedCar);
  } catch (err) {
    res.status(500).json({ message: 'Error updating car', error: err });
  }
});

// Delete a car (no authentication required)
router.delete('/:id', async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.status(200).json({ message: 'Car deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting car', error: err });
  }
});

module.exports = router;
