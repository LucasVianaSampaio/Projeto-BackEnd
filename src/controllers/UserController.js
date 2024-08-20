const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  async getUserById(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ error: 'User not found' });

      res.json({ id: user.id, firstname: user.firstname, surname: user.surname, email: user.email });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async createUser(req, res) {
    const { firstname, surname, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) return res.status(400).json({ error: 'Passwords do not match' });

    try {
      const hash = await bcrypt.hash(password, 10);
      const user = await User.create({ firstname, surname, email, password: hash });
      res.status(201).json({ id: user.id });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async updateUser(req, res) {
    const { firstname, surname, email } = req.body;
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ error: 'User not found' });

      user.firstname = firstname;
      user.surname = surname;
      user.email = email;

      await user.save();
      res.json({ message: 'User updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ error: 'User not found' });

      await user.destroy();
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};
