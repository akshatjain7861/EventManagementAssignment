const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
    try {
        const id = await Event.create(req.body);
        res.status(201).json({ id, message: 'Event created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getEvents = async (req, res) => {
    try {
        const { category } = req.query;
        const events = await Event.getAll(category);
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateEvent = async (req, res) => {
    try {
        await Event.update(req.params.id, req.body);
        res.json({ message: 'Event updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        await Event.delete(req.params.id);
        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
