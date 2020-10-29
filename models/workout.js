const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FitTracker = new Schema(
    {
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
        {
            type: {
                type: String,
                trim: true,
                required: "Enter Exercise"
            },
            name: {
                type: String,
                trim: true,
                required: "Enter Exercise Name"
            },
            duration: {
                type: Number,
                required: "Enter Time For Exercise"
            },
            weight: {
                type: Number,
                required: "Enter Weight"
            },
            reps: {
                type: Number,
                required: "Enter Number of Reps"
            },
            sets: {
                type: Number,
                required: "Enter Number of Sets"
            },
            distance: {
                type: Number,
                required: "Enter Distance"
            }
        }
    ],
},
{
    toObject: {
        virtuals: true
    }
},
{
    toJSON: {
        virtuals: true
    }
},
);

FitTracker
.virtual("totalDuration")
.get(() => {
    return this.exercises.reduce((currentDuration, previousDuration) => {
        return currentDuration + previousDuration.duration;
    }, 0);
});


const Workout = mongoose.model("Workout", FitTracker);

module.exports = Workout;
