const Notification = require('../../../models/notification');

const recordClick = async (clickData) => {
  const {
    notification_id,
    device_token_hash
  } = clickData;

  try {
    await Notification.updateOne(
      { notification_id, 'devices.device_token_hash': device_token_hash },
      { $set: { "devices.$.is_clicked": true } }
    )
    console.log(`Click Successfully recorded for ${notification_id} with device ${device_token_hash}`);
  } catch (error) {
    console.log('Error in recording click');
    console.log({ notification_id, device_token_hash, error});
    return;
  }
}

module.exports = recordClick;
