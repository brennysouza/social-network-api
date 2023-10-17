const { User, Thought } = require("../models");

const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find({})


    }
  }

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


    }

    updateThought({ params, body }, res) {


    }

    deleteThought({ params }, res) {
        
    }

    addReaction({ params, body }, res) {

    }

    deleteReaction({ params }, res) {

    }
};

module.exports = thoughtController;

