const router = require("express").Router();
const User = require("../models/User");

//Gets all users
router.get("/", async (req, res) => {
  try {
    let users;
    users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete user
router.delete("/:id", async (req, res) => {
  const userId = await User.findOne({ id: req.params.id });
  try {
    await userId.delete();
    res.status(200).json("The user has been deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
});

//Add new user
router.post("/", async (req, res) => {
  const newUser = new User(req.body);
  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
