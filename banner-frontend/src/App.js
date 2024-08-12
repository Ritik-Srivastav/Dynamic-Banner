import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Banner from './components/Banner';
import Timer from './components/Timer';
import ToggleButton from './components/ToggleButton';
import Dashboard from './components/Dashboard';
import './App.css';

const App = () => {
  const [settings, setSettings] = useState({
    description: '',
    timer: 60,
    link: '',
    visible: true,
  });
  const [isBannerVisible, setBannerVisible] = useState(true);
  const [initialTimer, setInitialTimer] = useState(60);
  const [resetTimer, setResetTimer] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  useEffect(() => {
    if (isBannerVisible) {
      setResetTimer(true); // Trigger timer reset when banner becomes visible
    }
  }, [isBannerVisible]);

  const fetchSettings = () => {
    axios.get('http://localhost:5000/api/banner')
      .then(response => {
        const data = response.data;
        setSettings(data);
        setBannerVisible(data.visible);
        setInitialTimer(data.timer);
        setResetTimer(false); // Reset timer flag
      })
      .catch(error => console.error(error));
  };

  const handleTimerEnd = () => {
    setBannerVisible(false); // Hide banner when timer ends
  };

  const toggleBanner = () => {
    setBannerVisible(prevState => !prevState);
    if (!isBannerVisible) {
      setResetTimer(true); // Trigger timer reset if banner is made visible
    }
  };

  return (
    <div className="app">
      <ToggleButton onToggle={toggleBanner} />
      <Banner
        image={settings.link}
        isVisible={isBannerVisible}
        description={settings.description}
      />
      {isBannerVisible && (
        <Timer
          initialTime={initialTimer}
          onTimerEnd={handleTimerEnd}
          reset={resetTimer}
        />
      )}
      <Dashboard onSettingsUpdated={fetchSettings} />
    </div>
  );
};

export default App;
