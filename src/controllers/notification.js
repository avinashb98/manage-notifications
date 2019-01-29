const Notification = require('../models/notification');
const sendClickToQueue = require('../queue/dbWrite/recordClick');
const sendViewToQueue = require('../queue/dbWrite/recordView');

const getTotalViews = async (req, res) => {
  const { notification_id } = req.body;
  let views;
  try {
    views = await Notification.aggregate([
      { $match: { notification_id } },
      { $unwind: '$devices' },
      { $match: { 'devices.is_viewed': true } },
      { $group: { _id: notification_id, totalViews: { $sum: 1 } } }
    ]);  
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal Server Error',
      data: {}
    });
    return;
  }
  res.status(200).json({
    message: 'Total Views on a Notification',
    data: {
      notification_id: views[0]._id,
      totalViews: views[0].totalViews
    }
  });
}

const getTotalViewsLastWeek = async (req, res) => {
  const { notification_id } = req.body;

  const aWeekAgo = new Date(new Date().setDate(new Date().getDate() - 7));
  
  let views;
  try {
    views = await Notification.aggregate([
      { $match: { notification_id } },
      { $unwind: '$devices' },
      { $match: {
          devices: {
            $elemMatch: {
              is_viewed: true,
              ts_updated: { $gte:  aWeekAgo }
            }
          },
        }
      },
      { $group: { _id: notification_id, totalViewsLastWeek: { $sum: 1 } } }
    ]);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal Server Error',
      data: {}
    });
    return;
  }

  if (views.length === 0) {
    res.status(200).json({
      message: 'Total Views on a Notification Last Week',
      data: {
        notification_id: notification_id,
        totalViewsLastWeek: 0
      }
    });
    return;
  }
  
  res.status(200).json({
    message: 'Total Views on a Notification Last Week',
    data: {
      notification_id: views[0]._id,
      totalViewsLastWeek: views[0].totalViewsLastWeek
    }
  });
}

const getTotalClicks = async (req, res) => {
  const { notification_id } = req.body;
  let clicks;
  try {
    clicks = await Notification.aggregate([
      { $match: { notification_id } },
      { $unwind: '$devices' },
      { $match: { 'devices.is_clicked': true } },
      { $group: { _id: notification_id, totalClicks: { $sum: 1 } } }
    ]);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal Server Error',
      data: {}
    });
    return;
  }
  res.status(200).json({
    message: 'Total Clicks on a Notification',
    data: {
      notification_id: clicks[0]._id,
      totalClicks: clicks[0].totalClicks
    }
  });
}

const getTotalClicksLastWeek = async (req, res) => {
  const { notification_id } = req.body;

  const aWeekAgo = new Date(new Date().setDate(new Date().getDate() - 7));
  
  let clicks;
  try {
    clicks = await Notification.aggregate([
      { $match: { notification_id } },
      { $unwind: '$devices' },
      { $match: {
        devices: {
          $elemMatch: {
            is_viewed: true,
            ts_updated: { $gte:  aWeekAgo }
          }
        },
      }
    },
    { $group: { _id: notification_id, totalClicksLastWeek: { $sum: 1 } } }
    ]);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal Server Error',
      data: {}
    });
    return;
  }

  if (clicks.length === 0) {
    res.status(200).json({
      message: 'Total Clicks on a Notification Last Week',
      data: {
        notification_id: notification_id,
        totalClicksLastWeek: 0
      }
    });
    return;
  }

  res.status(200).json({
    message: 'Total Clicks on a Notification Last Week',
    data: {
      notification_id: clicks[0]._id,
      totalClicksLastWeek: clicks[0].totalClicksLastWeek
    }
  });
}

const recordClick = async (req, res) => {
  const {
    notification_id,
    device_token_hash
  } = req.body;

  sendClickToQueue({ notification_id, device_token_hash });
  res.status(200).json({
    message: 'Request to record click received',
    data: {}
  });
}

const recordView = async (req, res) => {
  const {
    notification_id,
    device_token_hash
  } = req.body;

  sendViewToQueue({ notification_id, device_token_hash });
  res.status(200).json({
    message: 'Request to record view received',
    data: {}
  });
}

module.exports = {
  getTotalViews,
  getTotalClicks,
  getTotalClicksLastWeek,
  getTotalViewsLastWeek,
  recordClick,
  recordView
};
