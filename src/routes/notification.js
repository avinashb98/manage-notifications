const express = require('express');
const router = express.Router();
const notification = require('../controllers/notification');

router.get('/totalViews', notification.getTotalViews);
router.get('/totalClicks', notification.getTotalClicks);
router.get('/totalClicksLastWeek', notification.getTotalClicksLastWeek);
router.get('/totalViewsLastWeek', notification.getTotalViewsLastWeek);
router.put('/recordClick', notification.recordClick);
router.put('/recordView', notification.recordView);

module.exports = router;
