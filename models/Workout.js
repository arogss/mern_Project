const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
}, {
    timestamps: true,
});

const Workout = mongoose.model('workout', WorkoutSchema);

module.exports = Workout;