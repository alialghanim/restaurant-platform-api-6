const express = require('express');
const router = express.Router();

// Add this endpoint to fetch a menu by ID
router.get('/:id', async (req, res) => {
  try {
    const menuId = req.params.id;
    // Replace with your actual Menu model and fetching logic
    const menu = await Menu.findById(menuId);
    if (!menu) {
      return res.status(404).json({ message: 'Menu not found' });
    }
    res.json(menu);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
