const mongoose = require('mongoose');

const { Schema } = mongoose;

const NotificationSchema = new Schema({
  notification_id: {
    type: String,
    required: true
  },
  devices: [{
    device_token_hash: {
      type: String
    },
    site_id: {
      type: String
    },
    has_unsubscribed: {
      type: Boolean,
      default: false
    },
    is_clicked: {
      type: Boolean,
      default: false
    },
    is_viewed: {
      type: Boolean,
      default: false
    },
    ts_updated: {
      type: Date
    },
    ts_created: {
      type: Date
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Notification', NotificationSchema);
