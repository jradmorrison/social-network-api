const { User } = require('../models');

module.exports = {
  getUsers: async (req, res) => {
    try {
      const Users = await User.find();
      return res.status(200).json(Users);
    } catch (err) {
      return res.status(400).json(err);
    }
  },
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);

      if (!user) {
        return res.status(400).json({ message: 'No user by that ID' });
      }

      return res.status(200).json(user);
    } catch (err) {
      return res.status(400).json(err);
    }
  },
  createUser: async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      return res.status(200).json(newUser);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  updateUserById: async (req, res) => {},
  deleteUserById: async (req, res) => {},
  addFriend: async (req, res) => {},
  removeFriend: async (req, res) => {},
};
