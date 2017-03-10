var express = require('express');
var router = express.Router();
var ctrlMain = require('../controller/main');
var ctrlEvent = require('../controller/eventscontrollers');

/* GET home page. */
router.get('/', ctrlMain.index);

// /*GET 'Find Events' page */
router.get('/eventList', ctrlMain.eventList);

/*GET 'Events Details' page */
router.get('/eventDetail', ctrlMain.eventDetail);

/*Get 'Post Event' page */
router.get('/post', ctrlMain.postEvent);

/*GET 'Contact' page */
router.get('/contact', ctrlMain.contact);


router.get('/events', ctrlEvent.eventsGetAll);
router.get('/events/:venueName', ctrlEvent.eventGetOne);
module.exports = router;