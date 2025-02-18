import React, { useState } from 'react';

function PartnerTile({ partnerData, onDelete }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleDelete = (e) => {
    e.stopPropagation(); // Stop the event from propagating to the parent element
    console.log('Delete button clicked for:', partnerData.name); // Debugging log
    onDelete(partnerData.name);
  };

  const handleThumbnailClick = (e) => {
    e.stopPropagation(); 
    if (partnerData.website) {
      window.open(partnerData.website, '_blank');
    } 
  };

  const handleFlip = (e) => {
    e.stopPropagation();
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`partner-tile ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
      <div className="front">
        <img
          className="partner-thumbnail"
          src={partnerData.thumbnailUrl}
          alt={`${partnerData.name} thumbnail`}
          onClick={handleThumbnailClick}
          style={{ cursor: partnerData.website ? 'pointer' : 'not-allowed' }}
          title={partnerData.website ? `Visit ${partnerData.name} Website` : 'No website available'}
        />
        <hr />
        <div className="partner-info">
          <h3>{partnerData.name}</h3>
          <p>{partnerData.status}</p>
          <p>{partnerData.description}</p>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
      <div className="back">
        <h3>More Details</h3>
        <h3>Work in Progress</h3>
      </div>
    </div>
  );
}

export default PartnerTile;

