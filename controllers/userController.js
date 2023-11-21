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
  updateUserById: async (req, res) => {
    try {
      const updatedUser = await User.findOneAndUpdate(req.params.id, req.body, {
        new: true,
      });

      if (!updatedUser) {
        return res.status(400).json({ message: 'User not found' });
      }

      return res.status(200).json(updatedUser);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  deleteUserById: async (req, res) => {
    try {
      const deletedUser = await User.findOneAndDelete(req.params.id);

      if (!deletedUser) {
        return res.status(400).json({ message: 'User not found' });
      }

      return res.status(200).json(deletedUser);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  addFriend: async (req, res) => {
    try {
      const result = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );

      if (!result) {
        return res.status(400).json({ message: 'User not found' });
      }

      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  removeFriend: async (req, res) => {
    try {
      const result = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!result) {
        return res.status(400).json({ message: 'User not found' });
      }

      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};
