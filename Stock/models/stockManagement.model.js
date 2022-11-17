const mongoose = require("mongoose");

const stockManagementSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: true,
  },
  CreatedDate: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  UpdatedDate: {
    type: Date,
    required: false,
    default: null,
  },
});

module.exports = mongoose.model('StockManagement', stockManagementSchema)
