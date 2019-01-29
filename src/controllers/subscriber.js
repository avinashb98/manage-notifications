const Notification = require('../models/notification');

const getTotalClicks = async (req, res) => {
  const { device_token_hash } = req.body;
  let clicks;
  try {
    clicks = await Notification.aggregate([
      { $match: {
          devices: { $elemMatch: { device_token_hash, is_clicked: true } }
        }
      },
      { $group: { _id: device_token_hash, totalClicks: { $sum: 1 } } }
    ]);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal Server Error',
      data: {}
    });
    return;
  }

  if(clicks.length === 0) {
    res.status(200).json({
      message: 'Total Clicks by the subscriber',
      data: {
        device_token_hash,
        totalClicks: 0
      }
    });
    return;
  }
  
  res.status(200).json({
    message: 'Total Clicks by the subscriber',
    data: {
      device_token_hash: clicks[0]._id,
      totalClicks: clicks[0].totalClicks
    }
  });
}

const getTotalClicksLastWeek = async (req, res) => {
  const { device_token_hash } = req.body;

  const aWeekAgo = new Date(new Date().setDate(new Date().getDate() - 7));

  let clicks;
  try {
    clicks = await Notification.aggregate([
      { $match: {
          devices: {
            $elemMatch: {
              device_token_hash,
              is_clicked: true,
              ts_updated: { $gte:  aWeekAgo }
            }
          },
        }
      },
      { $group: { _id: device_token_hash, totalClicks: { $sum: 1 } } }
    ]);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal Server Error',
      data: {}
    });
    return;
  }

  if(clicks.length === 0) {
    res.status(200).json({
      message: 'Total clicks by the subscriber last week',
      data: {
        device_token_hash,
        totalClicks: 0
      }
    });
    return;
  }
  
  res.status(200).json({
    message: 'Total Clicks by the subscriber last week',
    data: {
      device_token_hash: clicks[0]._id,
      totalClicks: clicks[0].totalClicks
    }
  });
}

const getTotalViews = async (req, res) => {
  const { device_token_hash } = req.body;
  let views;
  try {
    views = await Notification.aggregate([
      { $match: {
          devices: { $elemMatch: { device_token_hash, is_viewed: true } }
        }
      },
      { $group: { _id: device_token_hash, totalViews: { $sum: 1 } } }
    ]);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal Server Error',
      data: {}
    });
    return;
  }

  if(views.length === 0) {
    res.status(200).json({
      message: 'Total Views by the subscriber',
      data: {
        device_token_hash,
        totalViews: 0
      }
    });
    return;
  }
  
  res.status(200).json({
    message: 'Total Views by the subscriber',
    data: {
      device_token_hash: views[0]._id,
      totalViews: views[0].totalViews
    }
  });
}

const getTotalViewsLastWeek = async (req, res) => {
  const { device_token_hash } = req.body;

  const aWeekAgo = new Date(new Date().setDate(new Date().getDate() - 7));
  
  let views;
  try {
    views = await Notification.aggregate([
      { $match: {
          devices: {
            $elemMatch: {
              device_token_hash,
              is_viewed: true,
              ts_updated: { $gte:  aWeekAgo }
            }
          },
        }
      },
      { $group: { _id: device_token_hash, totalClicks: { $sum: 1 } } }
    ]);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal Server Error',
      data: {}
    });
    return;
  }

  if(views.length === 0) {
    res.status(200).json({
      message: 'Total Views by the subscriber last week',
      data: {
        device_token_hash,
        totalViews: 0
      }
    });
    return;
  }
  
  res.status(200).json({
    message: 'Total Views by the subscriber last week',
    data: {
      device_token_hash: views[0]._id,
      totalViews: views[0].totalViews
    }
  });
}

module.exports = {
  getTotalClicks,
  getTotalClicksLastWeek,
  getTotalViews,
  getTotalViewsLastWeek
};
