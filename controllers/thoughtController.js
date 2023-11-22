const { Thought, User } = require('../models');

module.exports = {
  // Get all thoughts
  getThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find();
      return res.status(200).json(thoughts);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  // Get single thought by ID
  getSingleThought: async (req, res) => {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      return res.status(200).json(thought);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  // Create a new thought
  createThought: async (req, res) => {
    try {
      const newThought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: newThought._id } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'Thought created but no user with this id!' });
      }

      return res.status(200).json(newThought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Update a thought by ID
  updateThought: async (req, res) => {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!updatedThought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      return res.status(200).json(updatedThought);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  // Delete thought by ID
  deleteThought: async (req, res) => {
    try {
      const deletedThought = await Thought.findOneAndRemove({
        _id: req.params.thoughtId,
      });

      if (!deletedThought) {
        return res.status(404).json({ message: 'No thought found' });
      }

      // remove thought id from user's `thoughts`
      const user = User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'Thought created but no user with this id!' });
      }

      return res.status(200).json({ message: 'Thought successfully deleted!' });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  // Add a reaction to a thought
  addReaction: async (req, res) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      return res.status(200).json(thought);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  // Remove a reaction to a thought
  removeReaction: async (req, res) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      return res.status(200).json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};
