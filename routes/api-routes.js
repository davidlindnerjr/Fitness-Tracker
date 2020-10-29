const express = require("express");
const router = express.Router();
const Workout = require("../models/workout");

//api/routes
router.get("/api/workouts", (req, res) => {
    Workout.find({}).sort({day: -1})
    .then((dbWorkout) => {  
        res.send(dbWorkout);
    })
    .catch((err) => {
        res.send(err);
    })
});

router.get("/api/workouts/range", (req,res) => {
    Workout.find({})
    .then((dbWorkout) => {
      res.send(dbWorkout);
    })
    .catch((err) => {
      res.send(err);
    });
  });

router.post("/api/workouts", (req, res) => {
    Workout.create({
        day: new Date().setDate(new Date().getDate())
    })
    .then((dbWorkout) => {
        res.send(dbWorkout);
    })
    .catch((err) => {
        res.send(err);
    });
});

router.put("/api/workouts/:id", (req, res) => {
  Workout.updateOne( {_id: req.params.id }, {$push: {exercises:  [
    {
    "type" : req.body.type,
    "name" : req.body.name,
    "duration" : req.body.duration,
    "weight" : req.body.weight,
    "reps" : req.body.reps,
    "sets" : req.body.sets,
    "distance" : req.body.distance
    }
  ]
  }}).then((dbWorkout) => {
    res.send(dbWorkout)
  }).catch((err) => {
      res.send(err);
    });
});

module.exports = router;