import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Select, message } from 'antd'; // Import Ant Design components
import './EventPage.css'; // Import custom CSS

const { Option } = Select;

const EventForm = ({ eventData, categories, onSubmit }) => {
  const [selectedCategories, setSelectedCategories] = useState(
    eventData ? eventData.categories : []
  );
  const [formData, setFormData] = useState(eventData || {});

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle category selection
  const handleCategoryChange = (value) => {
    setSelectedCategories(value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const eventDetails = { ...formData, categories: selectedCategories };
      const response = await axios.post('http://localhost:5000/api/events/', eventDetails);
      message.success('Event created successfully!');
      console.log('Event Created:', response.data);
    } catch (error) {
      console.error('Error creating event:', error);
      message.error('Failed to create event.');
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>{eventData ? 'Edit Event' : 'Create Event'}</h2>
        <form onSubmit={handleSubmit} className="event-form">
          <label htmlFor="name">Event Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name || ''}
            onChange={handleInputChange}
            placeholder="Enter event name"
            required
          />

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description || ''}
            onChange={handleInputChange}
            placeholder="Enter event description"
            required
          ></textarea>

          <label htmlFor="start_date_time">Start Date & Time</label>
          <input
            type="datetime-local"
            id="start_date_time"
            name="start_date_time"
            value={formData.start_date_time || ''}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="end_date_time">End Date & Time</label>
          <input
            type="datetime-local"
            id="end_date_time"
            name="end_date_time"
            value={formData.end_date_time || ''}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="categories">Categories</label>
          <Select
            mode="multiple"
            placeholder="Select categories"
            value={selectedCategories}
            onChange={handleCategoryChange}
            style={{ width: '100%' }}
          >
            {categories.map((category) => (
              <Option key={category.id} value={category.id}>
                {category.name}
              </Option>
            ))}
          </Select>

          <button type="submit" className="submit-btn">
            {eventData ? 'Update Event' : 'Create Event'}
          </button>
        </form>
      </div>
    </div>
  );
};

const EventPage = () => {
  const [eventData, setEventData] = useState(null);
  const [categories, setCategories] = useState([]);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories/');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        message.error('Failed to load categories.');
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="event-page">
      <EventForm categories={categories} eventData={eventData} onSubmit={() => {}} />
    </div>
  );
};

export default EventPage;
