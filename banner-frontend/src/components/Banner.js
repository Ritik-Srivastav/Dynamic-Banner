import React from 'react';

const Banner = ({ image, isVisible, description }) => {
  if (!isVisible) return null;

  // Use the image path relative to the public folder
  const bannerImage = '../../images/banner1.jfif'; 

  return (
    <div className="banner" style={{ backgroundImage: `url(${bannerImage})` }}>
      <div className="banner-content">
        <h1>{description}</h1>
        {image && <a href={image} target="_blank" rel="noopener noreferrer">Learn More</a>}
      </div>
    </div>
  );
};

export default Banner;
