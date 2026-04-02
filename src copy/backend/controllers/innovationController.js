const Innovation = require("../models/Innovation");

const createInnovation = async (req, res) => {
  try {
    const innovation = await Innovation.create(req.body);
    res.status(201).json(innovation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createInnovation,
};