const { User } = require('../models');

const userController = {
  getAllUsers(req, res) {
    User.find({})
      .select('-__v')
      .then((users) => res.json(users))
      .catch((err) => res.status(400).json(err));
  },


  async getUserById(req, res) {
    try {
      const dbUserData = await User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate('thoughts')
        .populate('friends');

      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },


  createUser(req, res) {
    const { username, email } = req.body;
    User.create({ username, email })
      .then((user) => res.json(user))
      .catch((err) => res.status(400).json(err));
  },


  updateUser(req, res) {
    const { userId } = req.params;
    const { username, email } = req.body;
    User.findByIdAndUpdate(
      userId,
      { username, email },
      { new: true, runValidators: true }
    )
      .then((user) => res.json(user))
      .catch((err) => res.status(400).json(err));
  },


  deleteUser(req, res) {
    const { userId } = req.params;
    User.findByIdAndDelete(userId)
      .then((user) => res.json(user))
      .catch((err) => res.status(400).json(err));
  },

  addFriend(req, res) {
    const { userId, friendId } = req.params;
    User.findByIdAndUpdate(
      userId,
      { $addToSet: { friends: friendId } },
      { new: true }
    )
      .then((user) => res.json(user))
      .catch((err) => res.status(400).json(err));
  },

  removeFriend(req, res) {
    const { userId, friendId } = req.params;
    User.findByIdAndUpdate(
      userId,
      { $pull: { friends: friendId } },
      { new: true }
    )
      .then((user) => res.json(user))
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = userController;
