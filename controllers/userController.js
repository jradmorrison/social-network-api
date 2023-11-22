const { User } = require('../models');

module.exports = {
  // Get all users
  getUsers: async (req, res) => {
    try {
      const Users = await User.find();
      return res.status(200).json(Users);
    } catch (err) {
      return res.status(400).json(err);
    }
  },
  // Get user by ID
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId).populate([
        'friends',
        'thoughts',
      ]);

      if (!user) {
        return res.status(400).json({ message: 'No user by that ID' });
      }

      return res.status(200).json(user);
    } catch (err) {
      return res.status(400).json(err);
    }
  },
  // Create a new user
  createUser: async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      return res.status(200).json(newUser);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  // Update user by ID
  updateUserById: async (req, res) => {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        req.body,
        { new: true }
      );

      if (!updatedUser) {
        return res.status(400).json({ message: 'User not found' });
      }

      return res.status(200).json(updatedUser);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  // Delete a user by ID
  deleteUserById: async (req, res) => {
    try {
      const deletedUser = await User.findOneAndDelete({
        _id: req.params.userId,
      });

      if (!deletedUser) {
        return res.status(400).json({ message: 'User not found' });
      }

      return res.status(200).json(deletedUser);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  // Add a friend to a users' 'friends' list
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
  // Remove a friend from a users' 'friends' list
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
