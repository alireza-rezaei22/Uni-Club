import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  chatId: {
    type: String,
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product',
    required: true
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }],
  messages: [{
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    text: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
  }],
  updatedAt: {
    type: Date,
  }
}, {
  timestamps: true
});

const chatModel = mongoose.models.chat || mongoose.model('chat', chatSchema)
export default chatModel
