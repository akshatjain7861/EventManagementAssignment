const express = require('express');
const { createEvent, getEvents, updateEvent, deleteEvent } = require('../controllers/eventController');

const router = express.Router();

router.post('/events', createEvent);
router.get('/events', getEvents);
router.patch('/events/:id', updateEvent);
router.delete('/events/:id', deleteEvent);

module.exports = router;
