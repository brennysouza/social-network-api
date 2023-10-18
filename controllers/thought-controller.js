const { Thought, User } = require('../models');

const thoughtController = {

  getAllThoughts(req, res) {
    Thought.find({})
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(400).json(err));
  },

  getThoughtById(req, res) {
    const { thoughtId } = req.params;
    Thought.findById(thoughtId)
      .then((thought) => res.json(thought))
      .catch((err) => res.status(400).json(err));
  },

  createThought(req, res) {
    const { thoughtText, username, userId } = req.body;
    Thought.create({ thoughtText, username, userId })
      .then((thought) => {
        return User.findByIdAndUpdate(
          userId,
          { $push: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) => res.json(user))
      .catch((err) => res.status(400).json(err));
  },

  updateThought(req, res) {
    const { thoughtId } = req.params;
    const { thoughtText } = req.body;
    Thought.findByIdAndUpdate(
      thoughtId,
      { thoughtText },
      { new: true, runValidators: true }
    )
      .then((thought) => res.json(thought))
      .catch((err) => res.status(400).json(err));
  },

  deleteThought(req, res) {
    const { thoughtId } = req.params;
    Thought.findByIdAndDelete(thoughtId)
      .then((thought) => {
        return User.findByIdAndUpdate(
          thought.userId,
          { $pull: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) => res.json(user))
      .catch((err) => res.status(400).json(err));
  },

createReaction(req, res) {
  const { thoughtId } = req.params;
  const { reactionBody, username } = req.body;

  const reactionData = {
    reactionBody,
    username,
  };

  Reaction.create(reactionData)
    .then((newReaction) => {
      return Thought.findByIdAndUpdate(
        thoughtId,
        { $push: { reactions: newReaction._id } },
        { new: true }
      );
    })
    .then((updatedThought) => {
      res.json(updatedThought);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
},


deleteReaction(req, res) {
  const { thoughtId, reactionId } = req.params;

  Thought.findById(thoughtId)
    .then((thought) => {
      if (!thought) {
        res.status(404).json({ message: 'Thought not found.' });
        return;
      }

      const reactionIndex = thought.reactions.findIndex(
        (reaction) => reaction._id.toString() === reactionId
      );

      if (reactionIndex === -1) {
        res.status(404).json({ message: 'Reaction not found in thought.' });
        return;
      }

      thought.reactions.splice(reactionIndex, 1);

      return thought.save();
    })
    .then((updatedThought) => {
      res.json(updatedThought);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
},
};

module.exports = thoughtController;