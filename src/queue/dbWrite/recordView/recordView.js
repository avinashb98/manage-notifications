const Notification = require('../../../models/notification');

const recordView = async (viewData) => {
  const {
    notification_id,
    device_token_hash
  } = viewData;

  try {
    await Notification.updateOne(
      { notification_id, 'devices.device_token_hash': device_token_hash },
      { $set: { "devices.$.is_viewed": true } }
    )
    console.log(`View Successfully recorded for ${notification_id} with device ${device_token_hash}`);
  } catch (error) {
    console.log('Error in recording view');
    console.log({ notification_id, device_token_hash, error});
    return;
  }
}

module.exports = recordView;
