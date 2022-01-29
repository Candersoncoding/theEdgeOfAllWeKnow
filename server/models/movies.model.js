const mongoose = require('mongoose');

const MoviesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "You must enter the movie Title"],
        validate:{ 
            validator: (input) => {
            return input.length > 2;
            },
            message: (input) => `${input.value} is not enough characters. 3 characters needed minimum.`
        }   
    },
    genre: {
        type: String,
        required: [true, "You must enter the Genre"],
        validate:{ 
            validator: (input) => {
            return input.length > 2;
            },
            message: (input) => `${input.value} is not enough characters. 3 characters needed minimum.`
        }
    },
    rating: {
        type: String,
        required: [true, "You must choose a movie Rating"]
    },
    releaseDate: {
        type: Date,
        required: [true, "You must enter the Release Date"]
    },
    inTheaters: {
        type: Boolean,
        required: [true, "Is the movie out yet?"]
    },
    length: {
        type: Number,
        required: [true, "You must enter how long the movie is (in minutes)"],
        validate:{ 
            validator: (input) => {
            return input > 0;
            },
            message: (input) => `Movie length must be more than 0. You submitted ${input.value} minutes.`
        }
    },
    image: {
        type: String,
        required: [true, "You need a Film Poster image"]
    },
    actors: [String]
})

const Movies = mongoose.model("Movies", MoviesSchema);

module.exports = Movies;