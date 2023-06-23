const asyncHandler = require("express-async-handler");
const Goal = require("../model/goalModel");

// Handler function to get all goals
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find();
  res.status(200).json(goals);
});

// Handler function to create a new goal
const setGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please enter a text file.");
  }
  const goal = await Goal.create({
    text: req.body.text,
  });
  res.status(201).json(goal);
});

// Handler function to update a goal
const putGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(202).json(updatedGoal);
});

// Handler function to delete a goal
const deleteGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  await Goal.findByIdAndDelete(req.params.id);

  res.status(203).json({ message: `Deleted goal with ID ${req.params.id}` });
});

module.exports = {
  getGoals,
  setGoals,
  putGoals,
  deleteGoals,
};
