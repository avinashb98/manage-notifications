const express = require('express');
const router = express.Router();
const subscriber = require('../controllers/subscriber');

router.get('/totalClicks', subscriber.getTotalClicks);
router.get('/totalClicksLastWeek', subscriber.getTotalClicksLastWeek);
router.get('/totalViews', subscriber.getTotalViews);
router.get('/totalViewsLastWeek', subscriber.getTotalViewsLastWeek);

module.exports = router;
