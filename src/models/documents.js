const mongoose = require('mongoose');

// Defining schema for Document
const orderSchema = new mongoose.Schema({
  order_number: {
    type: String,
    required: true
  },
  customer_id: {
    type: String,
    required: true
  },
  items: [
    {
      product_id: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    }
  ],
  total_amount: {
    type: Number,
    required: true
  },
  order_date: {
    type: Date,
    default: Date.now
  },
  shipping_address: {
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    postal_code: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    }
  },
  payment_method: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered'],
    default: 'pending'
  }
});

// Create a model for the "Orders" collection using the schema
const Order = mongoose.model('Documents', orderSchema);

module.exports = Order;
