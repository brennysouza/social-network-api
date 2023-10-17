const { User, Thought } = require('../models');

const userController = {
  getAllUsers(req, res) {
    User.find({})
      .populate('Thought')
      .populate('User')
      .then((users) => res.json(users))
      .catch((err) => res.status(400).json(err));
  },
  // Controller methods for GET, POST, PUT, and DELETE operations go here.
};

module.exports = userController;
