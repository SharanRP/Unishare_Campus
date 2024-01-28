const express = require('express');
const router = express.Router();
const LostItem = require('../model/LostAndFound');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/all', async (req, res) => {
  try {
    const items = await LostItem.find({}).sort({ createdAt: 'desc' });
    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const item = await LostItem.findById(id);
    if (!item) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }
    res.status(200).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', upload.single('image'), async (req, res) => {
  console.log(req.body);
  try {
    const {
      fullName,
      email,
      contact,
      address,
      itemName,
      when,
      where,
      itemsDescription,
    } = req.body;

    if (
      !fullName ||
      !email ||
      !contact ||
      !itemName ||
      !when ||
      !where ||
      !itemsDescription
    ) {
      console.log('object');
      return res.status(400).json({ error: 'All fields are necessary.' });
    }

    const item = new LostItem({
      fullName,
      email,
      contact,
      address,
      itemName,
      image: req.file.buffer,
      when,
      where,
      itemsDescription,
    });

    await item.save();
    res.status(200).json({ item, msg: 'Item Posted...' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const item = await LostItem.deleteOne({ _id: id });

    if (item.deletedCount === 0) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }
    res.status(200).json({ msg: 'Item deleted...' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
