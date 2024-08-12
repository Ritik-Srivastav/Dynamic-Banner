import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = ({ onSettingsUpdated }) => {
  const [settings, setSettings] = useState({
    description: '',
    timer: 60,
    link: '',
    visible: true,
  });

  const [form, setForm] = useState(settings);

  useEffect(() => {
    axios.get('http://localhost:5000/api/banner')
      .then(response => {
        setSettings(response.data);
        setForm(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/banner', form)
      .then(() => {
        onSettingsUpdated(); // Notify parent component to refresh settings
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="dashboard">
      <h2>Banner Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Banner Description:</label>
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Banner Timer (seconds):</label>
          <input
            type="number"
            name="timer"
            value={form.timer}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Banner Link:</label>
          <input
            type="text"
            name="link"
            value={form.link}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Banner Visible:</label>
          <input
            type="checkbox"
            name="visible"
            checked={form.visible}
            onChange={() => setForm(prev => ({ ...prev, visible: !prev.visible }))}
          />
        </div>
        <button type="submit">Update Settings</button>
      </form>
    </div>
  );
};

export default Dashboard;
