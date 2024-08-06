import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    // Reset form after submission
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact-page">
      <div className="container">
        <h1>Contact Us</h1>
        <p className="contact-intro">We'd love to hear from you. Please fill out the form below or use our contact information to get in touch.</p>
        
        <div className="contact-content">
          <div className="contact-form">
            <h2>Send us a message</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn">Send Message</button>
            </form>
          </div>
          
          <div className="contact-info">
            <h2>Contact Information</h2>
            <div className="info-item">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <p>123 AI Street, Tech City, TC 12345</p>
            </div>
            <div className="info-item">
              <FontAwesomeIcon icon={faPhone} />
              <p>+1 (555) 123-4567</p>
            </div>
            <div className="info-item">
              <FontAwesomeIcon icon={faEnvelope} />
              <p>contact@gptvetting.com</p>
            </div>
            <div className="map-container">
              <div className="map-placeholder">
                Map placeholder
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;