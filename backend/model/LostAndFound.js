const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lostItemSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: Number, required: true },
    address: { type: String, required: true },
    itemName: { type: String, required: true },
    image: {
      type: Buffer,
      required: true,
    },
    when: { type: Date, required: true },
    where: { type: String, required: true },
    itemsDescription: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('LostItem', lostItemSchema);
