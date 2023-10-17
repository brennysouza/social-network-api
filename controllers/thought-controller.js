const { User, Thought } = require("../models");
const Reaction = require('../models/Reaction');
const { db } = require("../models/User");
const { db } = require("../models/Thought");
const { db } = require("../models/Reaction");
const { db } = require("../models");

const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
    }
  },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
            res.status(404).json({ message: "Thought ID not found." });
            return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    createThought({ body }, res) {
      Thought.create(body)
          .then((dbThoughtData) => {
              return User.findOneAndUpdate(
                  { _id: body.userId },
                  { $push: { thoughts: dbThoughtData._id } },
                  { new: true }
              );
          })
          .then((dbUserData) => {
              if (!dbUserData) {
                  res.status(404).json({ message: "User ID not found." });
              } else {
                  res.json(dbUserData);
              }
          })
          .catch((thoughtErr) => {
              console.log(thoughtErr);
              res.status(400).json(thoughtErr);
          });
  }
  

    updateThought({ params, body }, res) {
      Thought.findOneAndUpdate({ _id: params.thoughtId }, body, {
        new: true,
        runValidators: true,
      })
        .then((dbThoughtData) => {
          if (!dbThoughtData) {
            res.status(404).json({ message: "Thought ID not found." });
            return;
          }
          res.json(dbThoughtData);
        })
        .catch((err) => res.status(400).json(err));
      },

    deleteThought({ params }, res) {
      Thought.findOneAndDelete({ _id: params.thoughtId })
          .then((dbThoughtData) => {
              if (!dbThoughtData) {
                  res.status(404).json({ message: "Thought ID not found." });
                  return;
              }
              res.json(dbThoughtData);
          })
          .catch((err) => res.status(400).json(err));
  }

    addReaction({ params, body }, res) {
      Reaction.create(body)
        .then((dbReactionData) => {
          return Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: dbReactionData._id } },
            { new: true }
          );
        })
        .then((dbThoughtData) => {
          if (!dbThoughtData) {
            res.status(404).json({ message: "Thought ID not found." });
            return;
          }
          res.json(dbThoughtData);
        })
        .catch((err) => res.json(err));
    },

    deleteReaction({ params }, res) {
      Reaction.findOneAndDelete({ _id: params.reactionId })
        .then((dbReactionData) => {
          if (!dbReactionData) {
            res.status(404).json({ message: "Reaction ID not found." });
            return;
          }
          res.json(dbReactionData);
        })
        .catch((err) => res.json(err));
    }
    


module.exports = thoughtController;

