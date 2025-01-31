import React, { useState, useEffect } from "react";
import { Card, Select, Row, Col, Modal, Input, Button } from "antd";
import "antd/dist/reset.css";

const { Option } = Select;

const EventCards = () => {
  const [events, setEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState(["All"]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [updatedEventName, setUpdatedEventName] = useState("");
  const [updatedEventDescription, setUpdatedEventDescription] = useState("");
  const [updatedStartDate, setUpdatedStartDate] = useState("");
  const [updatedEndDate, setUpdatedEndDate] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/events/");
        const data = await response.json();
        setEvents(data);

        // Extract categories from the fetched data
        const allCategories = ["All", ...new Set(data.flatMap(event => event.categories))];
        setCategories(allCategories);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = selectedCategory === "All"
    ? events
    : events.filter(event => event.categories.includes(selectedCategory));

  const handleEdit = (event) => {
    setCurrentEvent(event);
    setUpdatedEventName(event.name);
    setUpdatedEventDescription(event.description);
    setUpdatedStartDate(event.start_date_time);
    setUpdatedEndDate(event.end_date_time);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/events/${id}`, {
        method: "DELETE",
      });

      // Immediately update the state to reflect the deletion
      setEvents(prevEvents => prevEvents.filter(event => event.id !== id));
      alert("Event deleted successfully!");
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/events/${currentEvent.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: updatedEventName,
          description: updatedEventDescription,
          start_date_time: updatedStartDate,
          end_date_time: updatedEndDate,
        }),
      });
      const updatedEvent = await response.json();

      // Update the events state immediately to reflect the changes
      setEvents(prevEvents => 
        prevEvents.map(event => 
          event.id === updatedEvent.id ? updatedEvent : event
        )
      );

      setIsModalVisible(false);
      alert("Event updated successfully!");
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto" ,marginTop:'70px'}}>
      <h2 style={{ textAlign: "center", fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>All Events</h2>
      <Select
        style={{ marginBottom: "20px", width: "100%", maxWidth: "300px" }}
        value={selectedCategory}
        onChange={setSelectedCategory}
      >
        {categories.map(category => (
          <Option key={category} value={category}>{category}</Option>
        ))}
      </Select>
      <Row gutter={[16, 16]}>
        {filteredEvents.map(event => (
          <Col xs={24} sm={12} lg={8} key={event.id}>
            <Card
              hoverable
              cover={<img src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZXZlbnR8ZW58MHx8MHx8fDA%3D" alt={event.name} style={{ height: "200px", objectFit: "cover" }} />}
            >
              <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>{event.name}</h3>
              <p style={{ color: "#555", marginBottom: "10px" }}>{event.description}</p>
              <p style={{ fontSize: "14px", color: "#888" }}>
                <strong>Start:</strong> {new Date(event.start_date_time).toLocaleString()}
              </p>
              <p style={{ fontSize: "14px", color: "#888" }}>
                <strong>End:</strong> {new Date(event.end_date_time).toLocaleString()}
              </p>
              <div style={{ marginTop: "10px" }}>
                {event.categories.map((category, index) => (
                  <span
                    key={index}
                    style={{
                      display: "inline-block",
                      background: "#007BFF",
                      color: "white",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      marginRight: "5px"
                    }}
                  >
                    {category}
                  </span>
                ))}
              </div>
              <div style={{ marginTop: "10px", display: "flex", justifyContent: "space-between" }}>
                <Button type="primary" style={{backgroundColor:'green'}} onClick={() => handleEdit(event)}>Edit</Button>
                <Button type="danger" style={{backgroundColor:'red',color:'white'}} onClick={() => handleDelete(event.id)}>Delete</Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title="Edit Event"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>Cancel</Button>,
          <Button key="save" type="primary" onClick={handleSave}>Save</Button>
        ]}
      >
        <div>
          <label>Event Name</label>
          <Input
            value={updatedEventName}
            onChange={(e) => setUpdatedEventName(e.target.value)}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <label>Event Description</label>
          <Input.TextArea
            value={updatedEventDescription}
            onChange={(e) => setUpdatedEventDescription(e.target.value)}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <label>Start Date & Time</label>
          <Input
            type="datetime-local"
            value={updatedStartDate}
            onChange={(e) => setUpdatedStartDate(e.target.value)}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <label>End Date & Time</label>
          <Input
            type="datetime-local"
            value={updatedEndDate}
            onChange={(e) => setUpdatedEndDate(e.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default EventCards;
