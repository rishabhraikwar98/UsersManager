const Users = require("../models/user");
const userController = {
  getAllUsers: async (req, res) => {
    try {
      const {
        page = 1,
        limit = 20,
        domain,
        gender,
        available,
        search,
      } = req.query;
      let query = {};
      if (domain) {
        query.domain = domain;
      }
      if (gender) {
        query.gender = gender;
      }
      if (available) {
        query.available = available;
      }
      if (search) {
        query.first_name = { $regex: search, $options: "i" };
      }

      const users = await Users.find(query)
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .exec();
      if (!users) {
        res.status(404).send("Users not found");
      }
      res.status(200).send(users);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  getUserById: async (req, res) => {
    const { id } = req.params;
    try {
      const userWithId = await Users.findOne({ id: id });
      if (!userWithId) {
        res.status(404).send("User not found");
      }
      res.status(200).send(userWithId);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  addNewUser: async (req, res) => {
    try {
      const newUser = new Users(req.body);
      await newUser.save();
      res.status(201).send("User created successfully");
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  updateUser: async (req, res) => {
    const { id } = req.params;
    try {
      const updatedUser = await Users.findOneAndUpdate({ id: id }, req.body);
      if (!updatedUser) {
        res.status(404).send("User not found");
      }
      res.status(200).send("User updated successfully");
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  deleteUser: async (req, res) => {
    const { id } = req.params;
    try {
      const deletedUser = await Users.findOneAndDelete({ id: id });
      if (!deletedUser) {
        res.status(404).send("User not found");
      }
      res.status(200).send("User deleted successfully");
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
};
module.exports = userController;
