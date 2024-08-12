import React from 'react';

const ToggleButton = ({ onToggle }) => {
  return (
    <button className="toggle-button" onClick={onToggle}>
      Toggle Banner
    </button>
  );
};

export default ToggleButton;
