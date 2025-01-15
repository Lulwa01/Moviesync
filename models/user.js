const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    enum: ['fantasy', 'romance', 'mystery', 'drama', 'horror', 'comedy', 'action', 'crime', 'adventure', 'science-fiction', 'fiction', 'musical', 'animation', 'other'],
    required: true,
  },
  review: {
    type: String,
  },
})

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  movies: [movieSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
