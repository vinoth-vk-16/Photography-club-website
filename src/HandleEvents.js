import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './css/HandleEvents.module.css'; // Use CSS Modules

const HandleEvents = () => {
  const [requests, setRequests] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [driveLink, setDriveLink] = useState('');

  // Fetch all event requests on component mount
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get('https://backend-clubweb.onrender.com/api/bookings'); // Adjust the URL to match your backend
        setRequests(res.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
        setErrorMessage('Error fetching requests. Please try again.');
      }
    };

    fetchRequests();
  }, []);

  const handleAccept = async (requestId) => {
    try {
      const res = await axios.put(`https://backend-clubweb.onrender.com/api/bookings/${requestId}`, {
        bookingStatus: 'Accepted',
      });
      setRequests(requests.map(request => 
        request._id === requestId ? res.data : request
      ));
      setSuccessMessage('Request accepted successfully!');
      setErrorMessage('');
    } catch (error) {
      console.error('Error accepting request:', error);
      setErrorMessage('Error accepting request. Please try again.');
    }
  };

  const handleReject = async (requestId) => {
    try {
      const res = await axios.put(`https://backend-clubweb.onrender.com/api/bookings/${requestId}`, {
        bookingStatus: 'Rejected',
      });
      setRequests(requests.map(request => 
        request._id === requestId ? res.data : request
      ));
      setSuccessMessage('Request rejected successfully!');
      setErrorMessage('');
    } catch (error) {
      console.error('Error rejecting request:', error);
      setErrorMessage('Error rejecting request. Please try again.');
    }
  };

  const handleDriveLinkSubmit = async (requestId) => {
    try {
      const res = await axios.put(`https://backend-clubweb.onrender.com/api/bookings/${requestId}`, {
        driveLink,
      });
      setRequests(requests.map(request => 
        request._id === requestId ? res.data : request
      ));
      setDriveLink('');
      setSuccessMessage('Drive link updated successfully!');
      setErrorMessage('');
    } catch (error) {
      console.error('Error updating drive link:', error);
      setErrorMessage('Error updating drive link. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
    <h2 className={styles.header}>Manage Event Requests</h2>
    {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
    {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

    <table className={styles.eventsTable}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Event Name</th>
          <th>Event Date</th>
          <th>Club</th>
          <th>Status</th>
          <th>Drive Link</th>
          <th>Actions</th>
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
            <td>
              {request.bookingStatus !== 'Accepted' && (
                <>
                  <button className={`${styles.actionButton} ${styles.acceptButton}`} onClick={() => handleAccept(request._id)}>Accept</button>
                  <button className={`${styles.actionButton} ${styles.rejectButton}`} onClick={() => handleReject(request._id)}>Reject</button>
                </>
              )}
              <div>
                <input
                  type="text"
                  placeholder="Drive Link"
                  value={driveLink}
                  onChange={(e) => setDriveLink(e.target.value)}
                  className={styles.driveInput}
                />
                <button className={styles.updateButton} onClick={() => handleDriveLinkSubmit(request._id)}>Update Drive Link</button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default HandleEvents;
