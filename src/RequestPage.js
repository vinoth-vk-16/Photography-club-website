import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/requestPage.css'

const RequestPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    eventName: '',
    eventDate: '',
    club: '',
    userId: localStorage.getItem('userId') || '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [requests, setRequests] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventDateObj = new Date(formData.eventDate);
    const today = new Date();
    const minEventDate = new Date(today.setDate(today.getDate() + 7));

    if (eventDateObj < minEventDate) {
      setErrorMessage('Event date must be at least one week in the future.');
      return;
    }

    try {
      const res = await axios.post('https://backend-clubweb.onrender.com/api/bookings', formData);
      setSuccessMessage('Event request submitted successfully!');
      setErrorMessage('');
      setRequests([...requests, res.data]); // Add the new request to the state
      setFormData({
        name: '',
        eventName: '',
        eventDate: '',
        club: '',
        userId: localStorage.getItem('userId') || '',
      });
    } catch (error) {
      console.error('Error submitting request:', error);
      setErrorMessage('Error submitting request. Please try again.');
      setSuccessMessage('');
    }
  };

  // Fetch requests on component mount
  useEffect(() => {
    const fetchRequests = async () => {
      const userId = localStorage.getItem('userId');
      try {
        const res = await axios.get(`https://backend-clubweb.onrender.com/api/bookings/user/${userId}`);
        setRequests(res.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
        setErrorMessage('Error fetching requests. Please try again later.');
      }
    };
  
    fetchRequests();
  }, []);

  return (
    <div>
      <h2>Request an Event</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          onChange={handleChange}
          value={formData.name}
          required
        />
        <input
          type="text"
          name="eventName"
          placeholder="Event Name"
          onChange={handleChange}
          value={formData.eventName}
          required
        />
        <input
          type="date"
          name="eventDate"
          onChange={handleChange}
          value={formData.eventDate}
          required
        />
        <input
          type="text"
          name="club"
          placeholder="Club Name"
          onChange={handleChange}
          value={formData.club}
          required
        />
        <button type="submit">Submit Request</button>
      </form>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <h3>Your Requests</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Event Name</th>
            <th>Event Date</th>
            <th>Club</th>
            <th>Status</th>
            <th>Drive Link</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(request => (
            <tr key={request._id}>
              <td>{request.name}</td>
              <td>{request.eventName}</td>
              <td>{new Date(request.eventDate).toLocaleDateString()}</td>
              <td>{request.club}</td>
              <td>{request.bookingStatus}</td>
              <td>
                {request.driveLink ? (
                  <a href={request.driveLink} target="_blank" rel="noopener noreferrer">
                    View Photos
                  </a>
                ) : (
                  'Not provided'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestPage;
